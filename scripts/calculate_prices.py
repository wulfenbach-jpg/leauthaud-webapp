import os
import requests
import pandas as pd
import google.generativeai as genai
import io
import time

# Get your Gemini API key from the environment
API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("Error: Please set the GEMINI_API_KEY environment variable.")
    print("Example: export GEMINI_API_KEY='your_api_key_here'")
    exit(1)

genai.configure(api_key=API_KEY)
# We use gemini-1.5-flash as it is fast and suitable for parsing text tasks.
model = genai.GenerativeModel('gemini-1.5-flash')

# This is the public CSV URL configured in the app
CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9tMcmVf75Ufi9ZvICzQl4IcbQVU6ri732gXoxgk27RY_v3HU-EPKff7kd0XoK8w/pub?gid=1106095519&single=true&output=csv"

def get_price_range(links, description):
    if not links or pd.isna(links):
        return "Unknown"

    prompt = f"""
    You are a helpful assistant analyzing DIY irrigation and water management tech.
    I have a product or solution with the following description:
    {description}

    And the following links:
    {links}

    Please estimate the total cost or price of this solution based on these links and the description.
    If you can't access the link or find an exact price, give your best estimate for a DIY solution of this type.

    Return ONLY ONE of the following exact strings as the price range:
    "0-50"
    "50-200"
    "200-500"
    "500-1000"
    "Unknown"

    Do not return any other text, explanation, or formatting. Just the range string.
    """

    try:
        response = model.generate_content(prompt)
        text = response.text.strip().replace('"', '')

        valid_ranges = ["0-50", "50-200", "200-500", "500-1000"]
        if text in valid_ranges:
            return text
        else:
            return "Unknown"
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return "Unknown"

def main():
    print(f"Fetching data from {CSV_URL}...")
    response = requests.get(CSV_URL)

    if response.status_code != 200:
        print(f"Failed to fetch CSV: {response.status_code}")
        exit(1)

    # Read the raw lines. The app skips the first two lines, treating the 3rd as headers.
    raw_lines = response.text.splitlines()
    if len(raw_lines) < 3:
        print("CSV appears empty or missing headers.")
        exit(1)

    # The actual data headers are on row 3 (index 2)
    csv_data = "\n".join(raw_lines[2:])

    # Read into pandas
    df = pd.read_csv(io.StringIO(csv_data))

    # Add new columns if they don't exist
    if 'Price range' not in df.columns:
        df['Price range'] = ''
    if 'Type of board' not in df.columns:
        df['Type of board'] = ''

    print(f"Found {len(df)} rows. Analyzing prices...")

    # Iterate and analyze
    for index, row in df.iterrows():
        # Skip empty rows
        if pd.isna(row.get('Name')) or str(row.get('Name')).strip() == '':
            continue

        links = row.get('Link to website(s)', '')
        desc = row.get('Short description of product', '')
        current_range = row.get('Price range', '')

        # Only analyze if we haven't already and there are links
        if pd.isna(current_range) or str(current_range).strip() == '':
            print(f"[{index + 1}/{len(df)}] Estimating price for: {row.get('Name', 'Unknown')}")
            price_range = get_price_range(links, desc)
            df.at[index, 'Price range'] = price_range
            print(f"   -> Result: {price_range}")

            # Sleep briefly to avoid rate limits on free tier
            time.sleep(2)
        else:
            print(f"[{index + 1}/{len(df)}] Skipping {row.get('Name')} (already has range: {current_range})")

    # Save back to CSV
    output_file = 'updated_prices.csv'
    df.to_csv(output_file, index=False)
    print(f"\nDone! Updated data saved to {output_file}")
    print("You can now copy the 'Price range' and 'Type of board' columns back to your Google Sheet.")

if __name__ == "__main__":
    main()
