
import pandas as pd
import numpy as np
import re

# Load raw data
raw_data_path = "Responses extracted from online survey.csv"
df = pd.read_csv(raw_data_path)

# Step 1: Add Respondent ID and remove Timestamp
df.insert(0, 'Respondent ID', ['R' + str(i + 1).zfill(3) for i in range(len(df))])
df.drop(columns=['Timestamp'], errors='ignore', inplace=True)

# Step 2: Normalize Categorical Data
likert_map = {
    'Very Dissatisfied': 1,
    'Dissatisfied': 2,
    'Neutral': 3,
    'Satisfied': 4,
    'Very Satisfied': 5,
    'Very Concerned': 1,
    'Concerned': 2,
    'Slightly Concerned': 3,
    'Very Uncomfortable': 1,
    'Uncomfortable': 2,
    'Slightly Uncomfortable': 3,
    'Slightly Important': 3,
    'Important': 4,
    'Very Important': 5,
    'Comfortable': 4,
    'Very Comfortable': 5
}

df.replace(likert_map, inplace=True)

# Step 3: Match multi-choice columns dynamically
def match_column(columns, keyword):
    return next((col for col in columns if keyword.lower() in col.lower()), None)

compound_columns = [
    match_column(df.columns, 'main issues'),
    match_column(df.columns, 'features are important'),
    match_column(df.columns, 'security measures')
]

compound_columns = [col for col in compound_columns if col]

# Expand multi-choice columns
def expand_multichoice_column(df, column, delimiter=';'):
    expanded = df[column].fillna('').apply(lambda x: [i.strip().capitalize() for i in str(x).split(delimiter) if i.strip()])
    all_options = set([item for sublist in expanded for item in sublist])
    for option in all_options:
        df[f"{column}: {option}"] = expanded.apply(lambda x: 'Yes' if option in x else 'No')
    df.drop(columns=[column], inplace=True)
    return df

for col in compound_columns:
    df = expand_multichoice_column(df, col)

# Step 4: Handle missing values
df.replace('', 'No Answer', inplace=True)
df.fillna('No Answer', inplace=True)

# ✅ Step 5: Clean text: fix spaces, capitalize, fix typos
for col in df.columns:
    if df[col].dtype == object:
        df[col] = df[col].astype(str).map(lambda x: re.sub(r'\s+', ' ', x).strip().capitalize())

df.replace({'Recognosion': 'Recognition'}, regex=True, inplace=True)

# Step 6: Categorize comments
comment_col = match_column(df.columns, 'suggestions, comments, or concerns')
def categorize_comment(text):
    text = str(text).lower()
    if 'privacy' in text or 'track' in text:
        return 'Privacy Concern'
    elif 'feature' in text or 'notification' in text:
        return 'Feature Request'
    elif 'nothing' in text or 'none' in text or 'nope' in text or 'no answer' in text:
        return 'No Concern'
    return 'General Feedback'

if comment_col:
    df['Comment Category'] = df[comment_col].apply(categorize_comment)
else:
    df['Comment Category'] = 'No Comment Field Found'

# Step 7: Create views
cleaned_responses = df.copy()
thematic_summary = df['Comment Category'].value_counts().reset_index()
thematic_summary.columns = ['Theme', 'Count']

# Save cleaned data and summary
cleaned_path = "Cleaned_Responses.csv"
summary_path = "Thematic_Summary.csv"

cleaned_responses.to_csv(cleaned_path, index=False)
thematic_summary.to_csv(summary_path, index=False)

# Step 8: Create a mapping table for converted numerical values
mapping_table = pd.DataFrame(list(likert_map.items()), columns=['Original Response', 'Mapped Value'])

# Save the mapping table to a separate file
mapping_table_path = "Mapping_Table.csv"
mapping_table.to_csv(mapping_table_path, index=False)

# Final output messages
print("✅ Cleaning complete!")
print(f"🗂️ Cleaned data saved to: {cleaned_path}")
print(f"📊 Thematic summary saved to: {summary_path}")
print(f"📑 Mapping table saved to: {mapping_table_path}")
