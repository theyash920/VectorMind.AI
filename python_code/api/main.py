from agent_controller import AgentController
import json
import os

def main():
    agent_controller = AgentController()
    
    # Check if test_input.json exists
    if os.path.exists("test_input.json"):
        print("Loading test input from test_input.json...")
        with open("test_input.json", "r") as f:
            test_input = json.load(f)
        
        print("Processing request...")
        response = agent_controller.get_response(test_input)
        print("\n--- Response ---")
        print(json.dumps(response, indent=2))
    else:
        print("No test_input.json found. Agent controller initialized successfully.")
        print("To test, create a test_input.json file with your input data.")


if __name__ == "__main__":
    main()