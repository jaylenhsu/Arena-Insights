import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from joblib import load
from datetime import datetime
import os

def filterFutureGames(input_file):
    # Load the dataset
    df = pd.read_csv(input_file)
    
    # Convert 'Numerical Date' to datetime
    df['Game Date'] = pd.to_datetime(df['Numerical Date'], format='%m %d %y', errors='coerce')
    
    # Filter rows with dates after the current date
    current_datetime = datetime.now()
    df_filtered = df[df['Game Date'] > current_datetime]

    base_name, _ = os.path.splitext(input_file)
    output_file = f"{base_name}FutureGames.csv"
    
    # Save the filtered DataFrame
    df_filtered.drop(columns=['Game Date'], inplace=True)
    df_filtered.to_csv(output_file, index=False)
    print(f"Filtered data saved to '{output_file}'")

    # Example usage:
from futureGamePredictor import filterFutureGames
filterFutureGames('24to25SeasonCSVs/celtics.csv')

def predictGameAttendance(training_data_path, row_index):
    # Load the saved model
    model = load('model.joblib')

    # Load the datasets
    df_train_test = pd.read_csv(training_data_path)

    cleaned_data_path = 'cleaned.csv'
    df_cleaned = pd.read_csv(cleaned_data_path)

    categorical_features = ['Team', 'Opponent Team']
    preprocessor = ColumnTransformer(
        transformers=[('cat', OneHotEncoder(), categorical_features)],
        remainder='passthrough'
    )

    df_features = df_cleaned[['Team', 'Game Number', 'Opponent Team', 'Arena Capacity']]
    preprocessor.fit(df_features)

    row = df_train_test.iloc[[row_index]]
    X_row = row[['Team', 'Game Number', 'Opponent Team', 'Arena Capacity']]
    X_row_processed = preprocessor.transform(X_row)

    predicted_percentages = model.predict(X_row_processed)

    print(predicted_percentages)
    return(predicted_percentages)

    # Example Usage:
    #from futureGamePredictor import predictGameAttendance
    #predictGameAttendance('24to25SeasonCSVs/celticsFutureGames.csv', 0)
