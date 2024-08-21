# Project scope

## Login page
  - Functions
    - input field for Email and Password
    - Login and google
    - Forgot password
    - Create User

  - specification
    - Two-factor authentication : Not required 
    - User Permission : Not required 
    - Email Server: Not required.
   
## System
  - Functions
    - Import CSV
    - Burguer menu
    - Viewing the imports performed by displaying a column with the sum of column X
    - Delete CSV option.
    - Interactive graph showing selected imports.

  - Specifications:
    -  X-axis of the graph: Transaction Date.
    -  Y-axis of the graph: Balance.
    - System designed for use by a single user.
    - Responsive design for mobile devices.
    - No logos will be added.
    - Design will follow the layout provided by the client.

# Architecture

## Database model

```mermaid
erDiagram
    USER {
        int user_id PK
        datetime date_time
        varchar(40) name
        varchar(60) email
        varbinary(255) password
    }
    
    CSV_IMPORT {
        int id PK
        datetime date
        int user_id_fk FK
        int csv_id FK
        int type_import
    }

    CSV_DATA {
        int csv_id PK
        int csv_import_id_fk FK
        datetime data
        float balance
        float equity
        float deposit
    }

    USER ||--o{ CSV_IMPORT : "is-from"
    CSV_IMPORT ||--o{ CSV_DATA : "is-from"
```

# Stack

## Front-end
- Language: [Typescript](https://www.typescriptlang.org/)
- Framework: [React.js](https://react.dev/) | [Next.js](https://nextjs.org/)
- Style Lib: [TailwindCSS](https://tailwindcss.com/)
- Component System: [Shadcn UI](https://ui.shadcn.com/)
- Package Manager: [pnpm](https://pnpm.io/pt/) _*Alternative to `npm`_

## Back-end
- Language: [Python](https://www.python.org/)
- Framework: [FastAPI](https://fastapi.tiangolo.com/)
- Package Manager: [Pipenv](https://pipenv.pypa.io/)
- Database: [PostegreSQL](https://www.postgresql.org/)


# Example:

## Login page
![https://github.com/user-attachments/assets/52aa0edb-5b14-44d6-8439-3aea447f31a6](https://i.imgur.com/hlRKRju.jpeg)

## System
  ![WhatsApp Image 2024-08-09 at 11 04 57 (2)](https://i.imgur.com/UbjAOP7.jpeg)
  
## Graphics
  ![WhatsApp Image 2024-08-09 at 11 04 57 (1)](https://i.imgur.com/miHvOkP.jpeg)

## Database 
![cb65a1ca-37a7-455f-bd64-b84e0d00c71a](https://i.imgur.com/GdZsWl2.jpeg)
