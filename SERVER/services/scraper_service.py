from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from models.internship import InternshipModel

class ScraperService:
    def __init__(self):
        self.internship_model = InternshipModel()
        
    def setup_driver(self):
        """Setup and return the webdriver"""
        chrome_options = Options()
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920x1080')
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--disable-notifications')
        chrome_options.add_argument('--headless')
        # Run in headless mode for server
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.implicitly_wait(10)
        return driver, WebDriverWait(driver, 10)
    
    def close_popup(self, driver, wait):
        """Close the signup popup if it appears"""
        try:
            # Wait for the close button to be clickable
            close_button = wait.until(
                EC.element_to_be_clickable((By.ID, "close_popup"))
            )
            print("Popup detected, closing it...")
            close_button.click()
            time.sleep(1)  # Small delay to ensure popup closes
            print("Popup closed successfully")
            return True
        except Exception as e:
            print(f"No popup detected or couldn't close: {str(e)}")
            return False
    
    def scrape_internships(self, category):
        """Scrape internships for the given category"""
        result = {
            "success": False,
            "message": "",
            "data": []
        }
        
        driver, wait = self.setup_driver()
        
        try:
            print(f"Navigating to {category} internships page...")
            driver.get(f"https://internshala.com/internships/{category}")
            time.sleep(3)  # Wait for page to load
            
            # First attempt to close the popup if it appears
            self.close_popup(driver, wait)
            
            # Wait for internships to load
            internships = wait.until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.individual_internship"))
            )
            
            if not internships:
                result["message"] = "No internships found!"
                return result
            
            print(f"Found {len(internships)} internships")
            scraped_data = []
            
            for internship in internships:
                try:
                    title = internship.find_element(By.CSS_SELECTOR, "a.job-title-href").text.strip()
                    company = internship.find_element(By.CSS_SELECTOR, "p.company-name").text.strip()
                    location = internship.find_element(By.CSS_SELECTOR, "div.row-1-item.locations span a").text.strip()
                    duration = internship.find_element(By.CSS_SELECTOR, "div.row-1-item:nth-child(2) span").text.strip()
                    stipend = internship.find_element(By.CSS_SELECTOR, "span.stipend").text.strip()
                    
                    internship_data = {
                        "title": title,
                        "company": company,
                        "location": location,
                        "duration": duration,
                        "stipend": stipend,
                        "category": category
                    }
                    
                    # Insert into MongoDB
                    self.internship_model.insert_internship(internship_data)
                    scraped_data.append(internship_data)
                    print(f"Stored in DB: {title} at {company}")
                    
                except Exception as e:
                    print(f"Error processing internship: {str(e)}")
                    continue
            
            result["success"] = True
            result["message"] = f"Successfully scraped {len(scraped_data)} internships"
            result["data"] = scraped_data
            
        except Exception as e:
            result["message"] = f"Error during scraping: {str(e)}"
            driver.save_screenshot("scrape_error.png")
        
        finally:
            driver.quit()
            
        return result
    
    def get_internships_by_category(self, category):
        """Get internships by category from database"""
        return self.internship_model.find_internships_by_category(category)