import os
from dotenv import load_dotenv
from google import genai
import ast

load_dotenv()
prompt = '''
Generate 16 questions covering general knowledge topics such as world news, Indian history, global geography, the Indian film industry, Indian religions, economics, and other common knowledge areas. Start with low difficulty and gradually increase it with each level. Provide four options for each question, ensuring only one is correct while the others are closely related.
Output format - 
The output should strictly be in JSON format consisting with one key "output". The corresponding value should be a list of dictionaries with the following keys:

"question" (string): The question to be 
"options" (list): A list of options with one option as the correct answer to the question
"correct_answer": The index of the correct answer


'''

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
def question_answer_generation():
  clinet = genai.Client(
      api_key=GEMINI_API_KEY,
  )
  response = clinet.models.generate_content(
      model='gemini-2.0-flash',
      contents=prompt,
      config={
        'response_mime_type': 'application/json'
    }
      
  )
  response = ast.literal_eval(response.text)
  return response['output']

# if __name__ == "__main__":
#   question_answer_generation()  