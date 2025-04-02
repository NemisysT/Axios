# services/gemini_service.py
import google.generativeai as genai
import os
import base64
from PyPDF2 import PdfReader
import json  # Add this for parsing JSON responses
import logging  # Add this for logging
import re  # Add this for cleaning JSON responses

class GeminiService:
    def __init__(self):
        self.api_key = 'AIzaSyD9tAeFXCHe1-sWsvakCvr35xDHBzXAFj4'
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        
        genai.configure(api_key=self.api_key)
        # Remove model restriction
        self.model = genai.GenerativeModel()
    
    def _extract_text_from_pdf(self, filepath):
        """Extract text content from PDF file"""
        pdf_text = ""
        pdf = PdfReader(filepath)
        
        for page in pdf.pages:
            pdf_text += page.extract_text() + "\n\n"
        
        return pdf_text
    
    def extract_resume_data(self, filepath):
        """Extract structured resume data using Gemini API"""
        try:
            resume_content = self._extract_text_from_pdf(filepath)
            
            # Concatenate prompt and resume content
            prompt = """
            Please extract all relevant information from this resume document.
            Return the data in a structured JSON format.
            """
            input_text = f"{prompt}\n\n{resume_content}"
            
            # Log the input text for debugging
            logging.debug(f"Input sent to Gemini API: {input_text}")
            
            # Send to Gemini API
            response = self.model.generate_content(input_text)
            
            # Log the raw response for debugging
            logging.debug(f"Gemini API raw response: {response}")
            
            # Clean up the response text by removing backticks and ensuring valid JSON
            cleaned_response = re.sub(r'```[a-zA-Z]*', '', response.text).strip()
            
            # Validate and parse the response to extract structured data
            try:
                extracted_data = json.loads(cleaned_response)
            except json.JSONDecodeError as e:
                logging.error(f"Failed to parse Gemini API response: {cleaned_response}")
                raise Exception("Invalid JSON response from Gemini API")
            
            # Log the extracted data for debugging
            logging.debug(f"Extracted data: {extracted_data}")
            
            return extracted_data
            
        except Exception as e:
            logging.error(f"Error extracting data from resume: {str(e)}")
            raise Exception(f"Error extracting data from resume: {str(e)}")