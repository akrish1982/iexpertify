import yfinance as yf
import pandas as pd
from datetime import datetime

def get_options_data(ticker="AAPL"):
    stock = yf.Ticker(ticker)
    expiry_dates = stock.options
    unusual_options = []
    
    for date in expiry_dates:
        options = stock.option_chain(date)
        calls = options.calls
        puts = options.puts
        
        # Filter based on volume/open interest or other criteria
        unusual_calls = calls[calls['volume'] > calls['openInterest'] * 2]
        unusual_puts = puts[puts['volume'] > puts['openInterest'] * 2]
        
        if not unusual_calls.empty:
            unusual_options.append(unusual_calls)
        if not unusual_puts.empty:
            unusual_options.append(unusual_puts)
    
    if unusual_options:
        df = pd.concat(unusual_options)
        today = datetime.now().strftime("%Y-%m-%d")
        df.to_csv(f'unusual_options_{today}.csv', index=False)
        print(f"Unusual options saved for {today}")
    else:
        print("No unusual options found")

get_options_data("AAPL")
