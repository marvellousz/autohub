// Database of scripts
export interface Script {
    id: string;
    title: string;
    description: string;
    code: string;
    tags: string[];
    author: string;
    userId?: string; // Optional for backward compatibility
    dateAdded: string;
    downloadCount: number;
    category: ScriptCategory;
}

export type ScriptCategory = 
    | 'Web Scraping' 
    | 'File Automation' 
    | 'Data Processing' 
    | 'API Integration' 
    | 'Database' 
    | 'Network' 
    | 'System Utilities' 
    | 'Other';

// Initial data
export const scripts: Script[] = [
    {
        id: '1',
        title: 'Simple Web Scraper',
        description: 'A Python script to extract data from websites using BeautifulSoup and requests.',
        code: `import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    """Scrape data from a website."""
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Example: Extract all paragraph text
        paragraphs = soup.find_all('p')
        data = [p.text for p in paragraphs]
        return data
    else:
        print(f"Failed to fetch the website. Status code: {response.status_code}")
        return []

if __name__ == "__main__":
    target_url = "https://example.com"
    result = scrape_website(target_url)
    print(f"Found {len(result)} paragraphs:")
    for i, text in enumerate(result, 1):
        print(f"{i}. {text[:100]}...")`,
        tags: ['web-scraping', 'beautifulsoup', 'requests', 'python'],
        author: 'PythonDev',
        dateAdded: '2025-01-15',
        downloadCount: 253,
        category: 'Web Scraping'
    },
    {
        id: '2',
        title: 'Batch File Renamer',
        description: 'Rename multiple files in a directory based on patterns and rules.',
        code: `import os
import re
from datetime import datetime

def batch_rename(directory, pattern, replacement, recursive=False):
    """
    Rename files in a directory based on a regex pattern.
    
    Parameters:
    - directory: Path to the directory containing files
    - pattern: Regex pattern to match in filenames
    - replacement: Replacement string (can use regex groups)
    - recursive: Whether to process subdirectories
    """
    count = 0
    
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if re.search(pattern, filename):
                old_path = os.path.join(root, filename)
                new_filename = re.sub(pattern, replacement, filename)
                new_path = os.path.join(root, new_filename)
                
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} -> {new_filename}")
                count += 1
        
        if not recursive:
            break
            
    print(f"Total files renamed: {count}")

if __name__ == "__main__":
    # Example usage
    directory = "path/to/your/files"
    pattern = r"file_([0-9]+)_old"  # Matches file_123_old
    replacement = r"file_\\1_new"   # Changes to file_123_new
    
    batch_rename(directory, pattern, replacement)`,
        tags: ['files', 'batch-processing', 'rename', 'regex'],
        author: 'FileManager',
        dateAdded: '2025-02-23',
        downloadCount: 178,
        category: 'File Automation'
    },
    {
        id: '3',
        title: 'REST API Client',
        description: 'A reusable Python class for making REST API requests with authentication and error handling.',
        code: `import requests
import json
import time
from typing import Dict, Any, Optional, Union

class RestApiClient:
    """A reusable REST API client with authentication and error handling."""
    
    def __init__(self, base_url: str, auth_token: Optional[str] = None):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        if auth_token:
            self.session.headers.update({'Authorization': f'Bearer {auth_token}'})
        self.session.headers.update({'Content-Type': 'application/json'})
        
    def set_auth_token(self, token: str) -> None:
        """Update the authentication token."""
        self.session.headers.update({'Authorization': f'Bearer {token}'})
    
    def _handle_response(self, response: requests.Response) -> Dict[str, Any]:
        """Process the API response."""
        try:
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            # Handle common HTTP errors
            status_code = response.status_code
            error_msg = f"HTTP Error: {status_code}"
            
            try:
                error_data = response.json()
                if 'message' in error_data:
                    error_msg = f"{error_msg} - {error_data['message']}"
            except ValueError:
                pass
                
            if status_code == 429:  # Rate limiting
                retry_after = response.headers.get('Retry-After', '60')
                error_msg = f"{error_msg} - Rate limited. Retry after {retry_after} seconds."
            
            raise Exception(error_msg) from e
        except ValueError:
            # Handle non-JSON responses
            return {"raw_content": response.text}
    
    def get(self, endpoint: str, params: Optional[Dict] = None) -> Dict[str, Any]:
        """Send a GET request."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        response = self.session.get(url, params=params)
        return self._handle_response(response)
    
    def post(self, endpoint: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Send a POST request."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        response = self.session.post(url, json=data)
        return self._handle_response(response)
    
    def put(self, endpoint: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Send a PUT request."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        response = self.session.put(url, json=data)
        return self._handle_response(response)
    
    def delete(self, endpoint: str) -> Dict[str, Any]:
        """Send a DELETE request."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        response = self.session.delete(url)
        return self._handle_response(response)

# Example usage
if __name__ == "__main__":
    # Create an API client
    api = RestApiClient("https://api.example.com", auth_token="your_token_here")
    
    # Fetch data from the API
    try:
        users = api.get("users", params={"limit": 10})
        print(f"Found {len(users)} users")
        
        # Create a new resource
        new_item = api.post("items", data={"name": "New Item", "description": "A new item"})
        print(f"Created item with ID: {new_item['id']}")
    except Exception as e:
        print(f"Error: {e}")`,
        tags: ['api', 'rest', 'http', 'requests'],
        author: 'APImaster',
        dateAdded: '2025-03-10',
        downloadCount: 342,
        category: 'API Integration'
    },
    {
        id: '4',
        title: 'CSV Data Processor',
        description: 'Process CSV files with pandas, including filtering, transforming, and exporting data.',
        code: `import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional, Union
import os

class CsvProcessor:
    """A utility for processing CSV data with pandas."""
    
    def __init__(self, file_path: Optional[str] = None, data: Optional[pd.DataFrame] = None):
        if file_path:
            self.data = pd.read_csv(file_path)
        elif data is not None:
            self.data = data
        else:
            self.data = pd.DataFrame()
        
        self.original_data = self.data.copy()
    
    def reset(self) -> None:
        """Reset to the original data."""
        self.data = self.original_data.copy()
    
    def filter_rows(self, condition: str) -> 'CsvProcessor':
        """
        Filter rows using a pandas query string.
        
        Example: processor.filter_rows("age > 30 and city == 'New York'")
        """
        self.data = self.data.query(condition)
        return self
    
    def select_columns(self, columns: List[str]) -> 'CsvProcessor':
        """Select only specified columns."""
        self.data = self.data[columns]
        return self
    
    def rename_columns(self, column_map: Dict[str, str]) -> 'CsvProcessor':
        """Rename columns using a mapping."""
        self.data = self.data.rename(columns=column_map)
        return self
    
    def fill_missing(self, method: str = 'mean', columns: Optional[List[str]] = None) -> 'CsvProcessor':
        """
        Fill missing values.
        
        Parameters:
        - method: One of 'mean', 'median', 'mode', 'constant', 'ffill', 'bfill'
        - columns: Columns to fill (None for all)
        """
        target_cols = columns if columns else self.data.columns
        
        for col in target_cols:
            if col not in self.data.columns:
                continue
                
            if method == 'mean' and pd.api.types.is_numeric_dtype(self.data[col]):
                self.data[col] = self.data[col].fillna(self.data[col].mean())
            elif method == 'median' and pd.api.types.is_numeric_dtype(self.data[col]):
                self.data[col] = self.data[col].fillna(self.data[col].median())
            elif method == 'mode':
                self.data[col] = self.data[col].fillna(self.data[col].mode()[0])
            elif method == 'constant':
                self.data[col] = self.data[col].fillna('')
            elif method == 'ffill':
                self.data[col] = self.data[col].fillna(method='ffill')
            elif method == 'bfill':
                self.data[col] = self.data[col].fillna(method='bfill')
                
        return self
    
    def add_column(self, name: str, expression: str) -> 'CsvProcessor':
        """
        Add a new column based on an expression.
        
        Example: processor.add_column('full_name', "'Mr. ' + first_name + ' ' + last_name")
        """
        self.data[name] = self.data.eval(expression)
        return self
    
    def group_by(self, columns: List[str], agg_dict: Dict[str, str]) -> 'CsvProcessor':
        """
        Group by columns and aggregate.
        
        Example: processor.group_by(['category'], {'amount': 'sum', 'items': 'count'})
        """
        self.data = self.data.groupby(columns).agg(agg_dict).reset_index()
        return self
    
    def sort_by(self, columns: List[str], ascending: Union[bool, List[bool]] = True) -> 'CsvProcessor':
        """Sort data by columns."""
        self.data = self.data.sort_values(by=columns, ascending=ascending)
        return self
    
    def export_csv(self, file_path: str, index: bool = False) -> str:
        """Export data to a CSV file."""
        self.data.to_csv(file_path, index=index)
        return f"Exported {len(self.data)} rows to {file_path}"
    
    def export_excel(self, file_path: str, sheet_name: str = 'Sheet1', index: bool = False) -> str:
        """Export data to an Excel file."""
        self.data.to_excel(file_path, sheet_name=sheet_name, index=index)
        return f"Exported {len(self.data)} rows to {file_path}"
    
    def summary(self) -> Dict[str, Any]:
        """Get a summary of the current data."""
        numeric_cols = self.data.select_dtypes(include=[np.number]).columns.tolist()
        categorical_cols = self.data.select_dtypes(include=['object']).columns.tolist()
        
        summary = {
            'row_count': len(self.data),
            'column_count': len(self.data.columns),
            'columns': self.data.columns.tolist(),
            'missing_values': self.data.isnull().sum().to_dict(),
            'numeric_columns': numeric_cols,
            'categorical_columns': categorical_cols
        }
        
        # Add basic stats for numeric columns
        if numeric_cols:
            summary['numeric_stats'] = self.data[numeric_cols].describe().to_dict()
        
        # Add value counts for categorical columns (top 5)
        if categorical_cols:
            cat_stats = {}
            for col in categorical_cols:
                cat_stats[col] = self.data[col].value_counts().nlargest(5).to_dict()
            summary['categorical_stats'] = cat_stats
        
        return summary

# Example usage
if __name__ == "__main__":
    processor = CsvProcessor("data.csv")
    
    # Process the data
    processor.filter_rows("age >= 18") \
             .select_columns(['name', 'age', 'city', 'income']) \
             .rename_columns({'name': 'full_name'}) \
             .fill_missing(method='mean') \
             .add_column('income_category', 
                        "np.where(income > 50000, 'High', np.where(income > 30000, 'Medium', 'Low'))") \
             .sort_by(['city', 'income'], ascending=[True, False])
    
    # Export the processed data
    processor.export_csv("processed_data.csv")
    
    # Print summary
    summary = processor.summary()
    print(f"Processed {summary['row_count']} rows with {summary['column_count']} columns")`,
        tags: ['csv', 'data-processing', 'pandas', 'excel'],
        author: 'DataScientist',
        dateAdded: '2025-04-05',
        downloadCount: 420,
        category: 'Data Processing'
    },
    {
        id: '5',
        title: 'Database Connection Utility',
        description: 'A utility class for connecting to various database types and executing queries.',
        code: `import sqlite3
import pymysql
import psycopg2
from typing import Dict, List, Any, Optional, Tuple, Union
import json
import os

class DatabaseConnector:
    """
    A database connection utility supporting SQLite, MySQL, and PostgreSQL.
    """
    
    def __init__(self, db_type: str, **connection_params):
        """
        Initialize a database connection.
        
        Parameters:
        - db_type: 'sqlite', 'mysql', or 'postgresql'
        - connection_params: Connection parameters specific to the database type
          - For SQLite: 'database' (file path)
          - For MySQL/PostgreSQL: 'host', 'user', 'password', 'database', 'port' (optional)
        """
        self.db_type = db_type.lower()
        self.connection_params = connection_params
        self.connection = None
        self.cursor = None
        
    def __enter__(self):
        self.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
    
    def connect(self) -> None:
        """Establish connection to the database."""
        try:
            if self.db_type == 'sqlite':
                self.connection = sqlite3.connect(self.connection_params.get('database', ':memory:'))
                
            elif self.db_type == 'mysql':
                self.connection = pymysql.connect(
                    host=self.connection_params.get('host', 'localhost'),
                    user=self.connection_params.get('user', 'root'),
                    password=self.connection_params.get('password', ''),
                    database=self.connection_params.get('database', ''),
                    port=int(self.connection_params.get('port', 3306)),
                    charset='utf8mb4'
                )
                
            elif self.db_type == 'postgresql':
                self.connection = psycopg2.connect(
                    host=self.connection_params.get('host', 'localhost'),
                    user=self.connection_params.get('user', 'postgres'),
                    password=self.connection_params.get('password', ''),
                    dbname=self.connection_params.get('database', ''),
                    port=int(self.connection_params.get('port', 5432))
                )
            
            else:
                raise ValueError(f"Unsupported database type: {self.db_type}")
                
            self.cursor = self.connection.cursor()
            print(f"Connected to {self.db_type} database")
            
        except Exception as e:
            print(f"Error connecting to database: {e}")
            raise
    
    def close(self) -> None:
        """Close the database connection."""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
            print("Database connection closed")
    
    def execute_query(self, query: str, params: Optional[Tuple] = None) -> Optional[List[Tuple]]:
        """
        Execute a SQL query.
        
        Returns:
        - For SELECT queries: List of result rows
        - For INSERT/UPDATE/DELETE: None (changes are committed)
        """
        if not self.connection or not self.cursor:
            self.connect()
            
        try:
            self.cursor.execute(query, params or ())
            
            # Check if this is a SELECT query
            if query.strip().upper().startswith("SELECT"):
                return self.cursor.fetchall()
            else:
                self.connection.commit()
                return None
                
        except Exception as e:
            self.connection.rollback()
            print(f"Error executing query: {e}")
            raise
    
    def execute_many(self, query: str, params_list: List[Tuple]) -> None:
        """Execute a query with multiple parameter sets."""
        if not self.connection or not self.cursor:
            self.connect()
            
        try:
            self.cursor.executemany(query, params_list)
            self.connection.commit()
            
        except Exception as e:
            self.connection.rollback()
            print(f"Error executing batch query: {e}")
            raise
    
    def fetch_all(self, query: str, params: Optional[Tuple] = None) -> List[Dict[str, Any]]:
        """Fetch all rows as dictionaries."""
        if not self.connection or not self.cursor:
            self.connect()
            
        try:
            # For SQLite and PostgreSQL
            if self.db_type in ['sqlite', 'postgresql']:
                # Create a dictionary cursor if available
                if self.db_type == 'postgresql':
                    # Close existing cursor and create a new dictionary cursor
                    self.cursor.close()
                    self.cursor = self.connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
                
                # For SQLite, manually convert rows to dictionaries
                self.cursor.execute(query, params or ())
                columns = [desc[0] for desc in self.cursor.description]
                result = [dict(zip(columns, row)) for row in self.cursor.fetchall()]
                return result
                
            # For MySQL
            elif self.db_type == 'mysql':
                # Close existing cursor and create a new dictionary cursor
                self.cursor.close()
                self.cursor = self.connection.cursor(pymysql.cursors.DictCursor)
                self.cursor.execute(query, params or ())
                return self.cursor.fetchall()
                
        except Exception as e:
            print(f"Error fetching records: {e}")
            raise
    
    def table_exists(self, table_name: str) -> bool:
        """Check if a table exists."""
        if self.db_type == 'sqlite':
            query = "SELECT name FROM sqlite_master WHERE type='table' AND name=?"
            result = self.execute_query(query, (table_name,))
            
        elif self.db_type == 'mysql':
            query = "SHOW TABLES LIKE %s"
            result = self.execute_query(query, (table_name,))
            
        elif self.db_type == 'postgresql':
            query = "SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name=%s)"
            result = self.execute_query(query, (table_name,))
            
        return bool(result and result[0])
    
    def create_table(self, table_name: str, columns: Dict[str, str]) -> None:
        """
        Create a table if it doesn't exist.
        
        Parameters:
        - table_name: Name of the table
        - columns: Dictionary mapping column names to their definitions
        """
        # Build the CREATE TABLE query
        column_defs = [f"{col_name} {col_type}" for col_name, col_type in columns.items()]
        query = f"CREATE TABLE IF NOT EXISTS {table_name} ({', '.join(column_defs)})"
        
        self.execute_query(query)
        print(f"Table {table_name} created or already exists")
    
    def get_table_schema(self, table_name: str) -> List[Dict[str, str]]:
        """Get the schema of a table."""
        if self.db_type == 'sqlite':
            query = f"PRAGMA table_info({table_name})"
            rows = self.execute_query(query)
            schema = [{'name': row[1], 'type': row[2], 'notnull': row[3], 'pk': row[5]} for row in rows]
            
        elif self.db_type == 'mysql':
            query = f"DESCRIBE {table_name}"
            rows = self.execute_query(query)
            schema = [{'name': row[0], 'type': row[1], 'null': row[2], 'key': row[3], 'default': row[4]} for row in rows]
            
        elif self.db_type == 'postgresql':
            query = f"""
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = %s
            """
            rows = self.execute_query(query, (table_name,))
            schema = [{'name': row[0], 'type': row[1], 'nullable': row[2], 'default': row[3]} for row in rows]
            
        return schema

# Example usage
if __name__ == "__main__":
    # SQLite example
    with DatabaseConnector('sqlite', database='example.db') as db:
        # Create a table
        db.create_table('users', {
            'id': 'INTEGER PRIMARY KEY AUTOINCREMENT',
            'name': 'TEXT NOT NULL',
            'email': 'TEXT UNIQUE',
            'age': 'INTEGER',
            'created_at': 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
        })
        
        # Insert data
        db.execute_query(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            ('John Doe', 'john@example.com', 35)
        )
        
        # Batch insert
        users = [
            ('Jane Smith', 'jane@example.com', 28),
            ('Bob Johnson', 'bob@example.com', 42)
        ]
        db.execute_many(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            users
        )
        
        # Query data
        results = db.fetch_all("SELECT * FROM users WHERE age > ?", (30,))
        for user in results:
            print(f"User: {user['name']}, Email: {user['email']}, Age: {user['age']}")
            
        # Get schema
        schema = db.get_table_schema('users')
        print("Table schema:", json.dumps(schema, indent=2))`,
        tags: ['database', 'sql', 'sqlite', 'mysql', 'postgresql'],
        author: 'DBAdmin',
        dateAdded: '2025-04-18',
        downloadCount: 198,
        category: 'Database'
    }
];
