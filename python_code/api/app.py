from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agent_controller import AgentController
import uvicorn
import os

app = FastAPI()

# Initialize AgentController
# We initialize it here so it's ready when the app starts
try:
    agent_controller = AgentController()
except Exception as e:
    print(f"Error initializing AgentController: {e}")
    # In a real app, you might want to fail startup or handle this more gracefully
    agent_controller = None

class QueryRequest(BaseModel):
    text: str

@app.post("/query")
async def query_endpoint(request: QueryRequest):
    if not agent_controller:
        raise HTTPException(status_code=500, detail="AgentController not initialized")
    
    try:
        # The AgentController expects a dictionary with "input" -> "messages"
        # Based on main.py:
        # job_input = input["input"]
        # messages = job_input["messages"]
        
        # We'll construct the input format expected by AgentController
        # Assuming the user's text is the "content" of a message
        input_data = {
            "input": {
                "messages": [
                    {
                        "role": "user",
                        "content": request.text
                    }
                ]
            }
        }
        
        response = agent_controller.get_response(input_data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
