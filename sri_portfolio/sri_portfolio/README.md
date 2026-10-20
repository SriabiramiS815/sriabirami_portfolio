# Sri Abirami S - Portfolio (Django)

A personal portfolio built with **HTML, CSS, JavaScript, Python and Django**.

- Content-driven: all text lives in `portfolio/data.py` (edit it, refresh, done).
- Light / dark theme, responsive layout, mobile menu, scroll animations.
- Working contact form: validated in JavaScript and Django, saved to the database,
  and e-mailed to you. Read messages in the Django admin.

## Run it locally

```bash
cd sri_portfolio
 
# 1. (recommended) create a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. install Django
pip install -r requirements.txt

# 3. create the database tables
python manage.py migrate

# 4. (optional) create an admin login to read contact messages
python manage.py createsuperuser

# 5. start the site
python manage.py runserver
```

Open http://127.0.0.1:8000/ - the admin is at http://127.0.0.1:8000/admin/

## Project layout

```
sri_portfolio/
|-- manage.py
|-- requirements.txt
|-- config/                     Django project (settings, urls)
`-- portfolio/                  The portfolio app
    |-- data.py                 <- EDIT THIS: your resume content
    |-- models.py               ContactMessage model
    |-- forms.py                Contact form + spam honeypot
    |-- views.py                Home page + contact form endpoint
    |-- urls.py
    |-- admin.py                Inbox for contact messages
    |-- templates/portfolio/index.html
    `-- static/portfolio/
        |-- css/style.css
        |-- js/main.js
        `-- img/profile.jpg     <- your photo (replace to change it)
```

## Things to personalise

- **GitHub link:** set `"github"` in `PROFILE` (`portfolio/data.py`); the icon appears automatically.
- **Project links:** fill in `"link"` for each project in `data.py`.
- **LinkedIn:** the resume text shows `sri-abirami -807765382` with a space, so the URL was
  written as `sri-abirami-807765382`. Check it opens your profile and fix it in `data.py` if not.
- **Phone / address:** your phone number is shown on the Contact section. Only
  "Trichy, Tamil Nadu" is shown, not your street address. Remove `phone` from the template if you'd rather not publish it.

## Getting contact e-mails for real

By default, notification e-mails are only printed in the terminal. To send real e-mail
through Gmail, create an *App Password* in your Google account, then set:

```bash
export DJANGO_EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
export EMAIL_HOST_USER=sriabirami168@gmail.com
export EMAIL_HOST_PASSWORD=your-app-password
```

Messages are saved in the database and visible in `/admin/` either way.

## Deploying

Set these environment variables on your host (e.g. PythonAnywhere, Render, Railway):

```
DJANGO_SECRET_KEY=<a long random string>
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=yourdomain.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://yourdomain.com
```

Then run `python manage.py collectstatic`. On hosts that don't serve static files for you,
add `whitenoise` (`pip install whitenoise`, plus its middleware line in `config/settings.py`).
