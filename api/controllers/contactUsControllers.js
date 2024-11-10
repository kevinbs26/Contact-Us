const pool = require("../../config/db");
const userForm = require("../models/userForm");

  const createFeedback = async (req, res) => {
    const { name, email, content } = req.body;

    try {
        const user_form = await userForm.create({ name, email, content });
        console.log('User created with Sequelize:', user_form.toJSON());

        res.status(201).json(user_form);
        } 
    catch (error) {
        console.error("Error inserting Feedback:", error);
        res.status(500).json({ error: "Failed to insert feedback" });
    }
  };

  const createSubscription = async (req, res) => {
    const {email} = req.body;

    try {
        validation = await pool.query("SELECT email FROM user_subscription where email = ($1) LIMIT 1", [email]);
        console.log('check email:', validation);

        if(validation.rows.length > 0){
          res.status(500).json({ error: "Email already subscribed" });
        }
        else{
          const result = await pool.query(
            "INSERT INTO user_subscription (email) VALUES ($1) RETURNING *",
            [email]
            );
            console.log('Subscription created:', result);
    
            res.status(201).json(result.rows[0]);
        }
        
        } 
    catch (error) {
        console.error("Error inserting Subscription:", error);
        res.status(500).json({ error: "Failed to insert Subscription" });
    }
  }

  const unsubscribeNews = async (req, res) => {
    const {email} = req.body;

    try {
        validation = await pool.query("SELECT email FROM user_subscription where email = ($1) LIMIT 1", [email]);
        console.log('check email:', validation);

        if(validation.rows.length == 0){
          res.status(500).json({ error: "Email not found" });
        }
        else{
          const result = await pool.query(
            "UPDATE user_subscription SET status = 0 WHERE email = ($1) RETURNING *",
            [email]
            );
    
            res.status(201).json(result.rows[0]);
        }
        
        } 
    catch (error) {
      console.error("Error updating Subscription:", error);
      res.status(500).json({ error: "Failed to Unubscription" });
    }
  }
  
  module.exports = {
    createFeedback,
    createSubscription,
    unsubscribeNews
  };
  