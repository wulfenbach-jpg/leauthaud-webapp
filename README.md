# Open Source and DIY Sensing Systems for Water Management

We help growers and urban gardeners to understand and solve problems related to water resources by offering a bucket of innovations and solutions for water management.

## Project Mission
Water management tools and sensing systems are often expensive, proprietary, or difficult to find. This repository serves as a centralized hub for **nonproprietary, open-source, and DIY solutions**. Our goal is to empower individuals and communities with the technical knowledge needed to manage water resources sustainably and efficiently.

## Check out existing solutions!
A number of tools have been developed; however, they are scattered across the web. We have synthesized existing solutions and provided a technical description of each in this repository. 

Key features include:
- **Live Synchronization**: Data is pulled directly from a curated Google Sheet, ensuring the repository is always up-to-date with the latest research.
- **Technical Profiling**: Each entry includes TRL (Technology Readiness Level), scale of use, sensing types, and direct links to source documentation.
- **Search & Filter**: Navigate the catalog by technology type (IoT, AI, Remote Sensing), irrigation method (Drip, Sprinkler, Surface), and developer category.

## Contribute
We are constantly looking to expand this technical catalog. **Let us know if other existing tools exist so we can enrich this document!** 

If you have a solution to share or have found a bug in the documentation, please reach out or submit a suggestion via the linked research channels.

---
*Developed by Leauthaud Labs.*
### Price Range Estimation Tool

This repository includes a standalone Python script to automatically estimate the price range of solutions using Google's Gemini LLM. It analyzes the website links and description to categorize the solution into standard ranges: `0-50`, `50-200`, `200-500`, or `500-1000`.

To use the tool:

1. Setup your python environment:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r scripts/requirements.txt
```

2. Get a free Gemini API Key from Google AI Studio and set it in your environment:
```bash
export GEMINI_API_KEY="your_api_key_here"
```

3. Run the script:
```bash
python scripts/calculate_prices.py
```

4. The script will generate a file named `updated_prices.csv`. You can open this file and copy the new `Price range` and `Type of board` columns back into your main Google Sheet.
