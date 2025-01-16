# Create the virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install required packages
pip install -r requirements.txt

# Start the service
python app.py

The service will listen on port 5000.
Local address: http://localhost:5000
