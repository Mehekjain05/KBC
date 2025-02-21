import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
prompt = '''
Generate 16 questions covering general knowledge topics such as world news, Indian history, global geography, the Indian film industry, Indian religions, economics, and other common knowledge areas. Start with low difficulty and gradually increase it with each level. Provide four options for each question, ensuring only one is correct while the others are closely related.
Output format - 
Purely json format consisting a list of dictionaries, where each dictionaries consist of question, options(list), and correctoptions

'''

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
def question_answer_generation():
  clinet = genai.Client(
      api_key=GEMINI_API_KEY,
  )
  response = clinet.models.generate_content(
      model='gemini-2.0-flash',
      contents=prompt
      
  )
  return response.text

# if __name__ == "__main__":
#   question_answer_generation()  