# 🎓 InsightFlowEdu  
*A Data-Driven Academic Insight and Intervention Platform*

---

## 🌟 Overview
**InsightFlowEdu** is a mini-project developed as part of **Software Engineering** and **DBMS** coursework.  
It’s an integrated academic analytics platform that helps faculty identify at-risk students early through data-driven insights on performance, attendance, and feedback sentiment.

The project demonstrates:
- **Software Engineering principles** — SRS, class & sequence diagrams, use cases, and modular design.
- **DBMS skills** — Oracle database design, ER modeling, PL/SQL procedures, triggers, and Java database connectivity.

---

## 🧩 Key Features
- **Student Performance Tracking:** Records and analyzes GPA and attendance trends per semester.
- **Risk Assessment Engine:** PL/SQL procedure flags students below academic thresholds.
- **Feedback Sentiment Analysis:** Classifies student feedback as *positive*, *neutral*, or *negative* using a simple keyword-based PL/SQL function.
- **Intervention Logs:** Faculty can record and review intervention notes per student.
- **Dashboard UI:** Clean React-based interface for analytics, charts, and insights.

---

## ⚙️ Tech Stack
| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Database** | Oracle Database | Core data management, PL/SQL, triggers |
| **Backend** | SpringBoot,Flask (Python) | REST API and DB communication |
| **Java Module** | Java + JDBC (IntelliJ) | Demonstrates PL/SQL calls and DB connectivity |
| **Frontend** | React.js | User interface and dashboard |
| **Tools** | Oracle SQL Developer, DBeaver, IntelliJ IDEA | Development, testing, and DB visualization |

---

## 🧠 Database Design
- Fully normalized schema in **3NF**
- Includes ER diagram, relational tables, and integrity constraints
- Implements:
  - PL/SQL Procedure: `run_risk_engine`  
  - PL/SQL Function: `classify_sentiment`  
  - Trigger: `trg_interventions_timestamp`

---

## 🖥️ UI & Functionality
- Faculty Login  
- Dashboard with GPA and Attendance charts  
- Risk Analysis view  
- Feedback sentiment summary  
- Intervention management  

---

## 🧩 DBMS Deliverables
This project satisfies all the required components of the DBMS mini-project:
- Abstract, Problem Statement  
- ER Diagram and Normalized Tables  
- DDL Commands and Constraints  
- List of SQL Queries (Basic + Complex)  
- PL/SQL Procedures / Functions / Triggers  
- Java JDBC Connectivity  
- UI Design (screenshots included in `/docs` folder)  
- References  

---

## 🚀 Quick Start
1. **Install Oracle Database XE**  
   Download from [oracle.com/database/technologies/appdev/xe.html](https://www.oracle.com/data)
