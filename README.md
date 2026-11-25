# Minha Coleção: Séries

Sistema para cadastrar e acompanhar uma coleção de séries (Django + React).


## Integrantes:
Enzo Eduardo Gomes                   RGM: 11261105276
Nicolle Lara Cabral                  RGM: 11261104541
Pedro Henrique Pereira de Oliveira   RGM: 11261505443
Thais Pereira Bento                  RGM: 11261103163

## Como rodar

### Backend (Django)
Dentro da pasta `colecao`:

    python -m venv venv
    venv\Scripts\activate
    pip install django django-cors-headers
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

Depois, cadastrar as séries em http://127.0.0.1:8000/admin/

### Frontend (React)
Em outro terminal, dentro de `colecao/frontend`:

    npm install
    npm run dev

Abrir http://localhost:5173
