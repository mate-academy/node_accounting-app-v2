const express = require("express");


function createServer() {
  const app = express();
  app.use(express.json());

 
  const db = {
    categories: [],
    expenses: [],
  };

  let idSeq = 1;
  const nextId = () => String(idSeq++);

  
  const findById = (col, id) => db[col].find((item) => item.id === id);
  const removeById = (col, id) => {
    const idx = db[col].findIndex((item) => item.id === id);
    if (idx === -1) return null;
    const [removed] = db[col].splice(idx, 1);
    return removed;
  };

  app.get("/categories", (req, res) => {
    res.status(200).json(db.categories);
  });

  app.get("/categories/:id", (req, res) => {
    const cat = findById("categories", req.params.id);
    if (!cat) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(cat);
  });

  
  app.post("/categories", (req, res) => {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ error: "Missing required field: name" });

    const category = { id: nextId(), name };
    db.categories.push(category);
    res.status(201).json(category);
  });

  
  app.put("/categories/:id", (req, res) => {
    const cat = findById("categories", req.params.id);
    if (!cat) return res.status(404).json({ error: "Category not found" });

    const { name } = req.body || {};
    if (!name) return res.status(400).json({ error: "Missing required field: name" });

    cat.name = name;
    res.status(200).json(cat);
  });

 
  app.delete("/categories/:id", (req, res) => {
    const removed = removeById("categories", req.params.id);
    if (!removed) return res.status(404).json({ error: "Category not found" });
       res.status(204).send();
  });

  
  
  app.get("/expenses", (req, res) => {
    res.status(200).json(db.expenses);
  });

  
  app.get("/expenses/:id", (req, res) => {
    const exp = findById("expenses", req.params.id);
    if (!exp) return res.status(404).json({ error: "Expense not found" });
    res.status(200).json(exp);
  });

  
  app.post("/expenses", (req, res) => {
    const { amount, categoryId, description, date } = req.body || {};

    
    if (amount === undefined) {
      return res.status(400).json({ error: "Missing required field: amount" });
    }
    if (categoryId === undefined) {
      return res.status(400).json({ error: "Missing required field: categoryId" });
    }

    
    const category = findById("categories", String(categoryId));
    if (!category) {
      return res.status(400).json({ error: "categoryId does not reference an existing category" });
    }

    const expense = {
      id: nextId(),
      amount,
      categoryId: String(categoryId),
      description: description ?? null,
      date: date ?? null,
    };

    db.expenses.push(expense);
    res.status(201).json(expense);
  });

  
  app.put("/expenses/:id", (req, res) => {
    const exp = findById("expenses", req.params.id);
    if (!exp) return res.status(404).json({ error: "Expense not found" });

    const { amount, categoryId, description, date } = req.body || {};

    
    if (amount === undefined && categoryId === undefined && description === undefined && date === undefined) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    if (categoryId !== undefined) {
      const category = findById("categories", String(categoryId));
      if (!category) {
        return res.status(400).json({ error: "categoryId does not reference an existing category" });
      }
      exp.categoryId = String(categoryId);
    }
    if (amount !== undefined) exp.amount = amount;
    if (description !== undefined) exp.description = description;
    if (date !== undefined) exp.date = date;

    res.status(200).json(exp);
  });

  
  app.delete("/expenses/:id", (req, res) => {
    const removed = removeById("expenses", req.params.id);
    if (!removed) return res.status(404).json({ error: "Expense not found" });
    res.status(204).send();
  });

  
  app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
  });

  return app;
}

module.exports = createServer;
