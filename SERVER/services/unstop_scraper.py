from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
from dotenv import load_dotenv
from models.unstopInternships import InternshipModel

class UnstopScraper:
    def __init__(self):
        # Load environment variables
        load_dotenv()
        
        # Credentials from environment variables
        self.username = 'dilipsc570@gmail.com'
        self.password = 'dilip$004'
        
        # MongoDB Model
        self.model = InternshipModel()
    
    def _setup_driver(self):
        """Set up and configure the Selenium WebDriver"""
        # Set up Chrome options
        chrome_options = Options()
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920x1080')
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--disable-notifications')
        # chrome_options.add_argument('--headless')  # Run in headless mode
        
        # Initialize WebDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 20)
        driver.implicitly_wait(20)
        
        return driver, wait
    
    def _login_to_unstop(self, driver, wait):
        """Login to Unstop using provided credentials"""
        try:
            # Navigate to login page
            driver.get("https://unstop.com/auth/login?returnUrl=%2F")
            time.sleep(3)
            
            # Find and fill email/username field
            email_field = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='email']"))
            )
            email_field.clear()
            email_field.send_keys(self.username)
            
            # Find and fill password field
            password_field = driver.find_element(By.CSS_SELECTOR, "input[name='password']")
            password_field.clear()
            password_field.send_keys(self.password)
            
            # Click login button
            login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            login_button.click()
            
            # Wait for login to complete
            time.sleep(5)
            return True
            
        except Exception as e:
            print(f"Login Error: {str(e)}")
            driver.save_screenshot("login_error.png")
            return False
    
    def scrape_internships(self, filters):
        """
        Scrape internships from Unstop with the given filters
        
        Args:
            filters (dict): Filters for scraping including category, usertype, etc.
        
        Returns:
            dict: Result of the scraping operation
        """
        driver, wait = self._setup_driver()
        count = 0
        
        try:
            # Login first
            if not self._login_to_unstop(driver, wait):
                return {'count': 0, 'message': 'Login failed'}
            
            # Construct URL with filters
            category = filters.get('category', 'full-stack-development')
            usertype = filters.get('usertype', 'fresher')
            passing_year = filters.get('passing_year', '2027')
            quick_apply = "true" if filters.get('quick_apply', True) else "false"
            
            url = f"https://unstop.com/internships?oppstatus=open&category={category}&quickApply={quick_apply}&usertype={usertype}&fresherPassingOutYear={passing_year}"
            
            # Navigate to the specific internships URL
            driver.get(url)
            time.sleep(5)
            
            # Scroll to load more internships
            last_height = driver.execute_script("return document.body.scrollHeight")
            scroll_attempts = 0
            max_scroll_attempts = 5  # Limit scrolling to prevent infinite loop
            
            while scroll_attempts < max_scroll_attempts:
                # Scroll down to bottom
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                
                # Wait to load page
                time.sleep(3)
                
                # Calculate new scroll height and compare with last scroll height
                new_height = driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
                scroll_attempts += 1
            
            # Wait for internships to load
            internship_cards = wait.until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.user_img.opp_content"))
            )
            
            if not internship_cards:
                return {'count': 0, 'message': 'No internships found'}
            
            # Reference to MongoDB collection
            collection = self.model.collection
            
            for card in internship_cards:
                try:
                    # Extract internship title
                    title = card.find_element(By.CSS_SELECTOR, "h2.double-wrap").text.strip()
                    
                    # Extract company name
                    try:
                        company = card.find_element(By.CSS_SELECTOR, "p").text.strip()
                    except:
                        company = "Not specified"
                    
                    # Extract number of applicants
                    try:
                        applicants_elem = card.find_element(By.CSS_SELECTOR, "div.seperate_box.align-center .ng-star-inserted")
                        applicants = applicants_elem.text.strip().split()[0]
                    except:
                        applicants = "N/A"
                    
                    # Extract days left
                    try:
                        days_left_elem = card.find_elements(By.CSS_SELECTOR, "div.seperate_box.align-center")[1]
                        days_left = days_left_elem.text.strip().split()[0]
                    except:
                        days_left = "N/A"
                    
                    # Extract skills/eligibility
                    try:
                        skills = [
                            skill.text.strip() 
                            for skill in card.find_elements(By.CSS_SELECTOR, "un-chip-items .chip_text")
                        ]
                    except:
                        skills = []
                    
                    # Prepare data for MongoDB
                    internship_data = {
                        "title": title,
                        "company": company,
                        "applicants": applicants,
                        "days_left": days_left,
                        "skills": skills,
                        "category": category
                    }
                    
                    # Check if internship already exists to avoid duplicates
                    existing = collection.find_one({
                        "title": title, 
                        "company": company
                    })
                    
                    if not existing:
                        # Insert into MongoDB
                        collection.insert_one(internship_data)
                        count += 1
                    
                except Exception as e:
                    print(f"Error processing internship card: {str(e)}")
                    continue
            
            return {'count': count, 'message': f'Successfully scraped {count} new internships'}
            
        except Exception as e:
            print(f"Scraping Error: {str(e)}")
            if driver:
                driver.save_screenshot("scrape_error.png")
            return {'count': count, 'message': f'Error during scraping: {str(e)}'}
            
        finally:
            if driver:
                driver.quit()