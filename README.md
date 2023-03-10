# rep-accounts

## Installation:

To install and run locally:

- Clone the project:

  ```bash
  git clone https://github.com/user-repo/support.git
  ```

- Change directory & Create virtualenv called **env**:
  ```bash
  cd support
  ```
  ```bash
  python3 -m venv env
  ```

- Activate virtualenv:
  - for Windows System:
    ```bash
      env\Scripts\activate
    ```
  - for Linux System:
    ```bash
      source ./env/bin/activate
    ```

- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

- Migrate & Runserver:
  ```bash
  python manage.py migrate
  ```
  ```bash
  python manage.py runserver
  ```

- Finally open the localhost in the browser:
  ```bash
    http://127.0.0.1:8000/
  ```