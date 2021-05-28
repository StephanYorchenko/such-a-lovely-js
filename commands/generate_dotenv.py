import string
import secrets
import dotenv

PUNCTUATION = "!@#%^&*(-_=+)"
PASSWORD_LENGTH = 64

KEY_VARIABLES = (
    'APP_SECRET_KEY',
)
ENV_FILE = './generate_dotenv/.env.example'


def generate_password(length=64):
    alphabet = string.ascii_letters + string.digits + PUNCTUATION
    while True:
        password = ''.join(secrets.choice(alphabet) for i in range(length))
        if not (password.islower() or password.isupper()):
            return password


def generate_env_file():
    for key_var in KEY_VARIABLES:
        dotenv.set_key(ENV_FILE, key_var, generate_password(), quote_mode='never')


if __name__ == "__main__":
    generate_env_file()
