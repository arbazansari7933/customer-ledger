import Customer from "../models/Customer.js";
import User from "../models/User.js";

//
export const addCustomer = async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        // Validation base level
        if (!name || !phone) {
            return res.status(400).json({ message: "Name and phone are required " });
        }
        // create a new customer 
        const customer = await Customer.create({
            name,
            phone,
            address,
            createdBy: req.user._id,
        });
        res.status(201).json({
            message: "Customer added successfully",
            customer,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server Error" });
    }
};

//
export const customerList = async (req, res) => {
    try {
        let customers;
        //Owner 
        // if (req.user.role == "owner") {
        customers = await Customer.find().sort({ createdAt: -1 });
        // }
        //Employee
        // else {
        //   customers = await Customer.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        // }

        res.json({
            message: "Customer fetched successfully",
            customers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//Customer Details
export const customerDetails = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            res.status(400).json({ message: "Customer not found!" })
        }
        if (req.user.role != "owner" && customer.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }
        res.status(200).json(
            {
                message: "Customer detail fetched successfully",
                customer: customer,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//Delete Customer
export const deleteCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json(
                {
                    message: "This Customer is not found",
                }
            )
        }
        if (req.user.role !== "owner" && customer.createdBy.toString() !== req.user._id.toString()) {
            res.status(403).json({
                message: "You are not allowed to delete this customer",
            })
        }
        await Customer.findByIdAndDelete(customerId);
        res.status(200).json({
            message: "This customer is deleted! ",
            customer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}
//EditCustomer
export const editCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { name, phone, address } = req.body;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(400).json({ message: "Customer not found to update!" });
        }
        if (req.user.role !== "owner" && customer.createdBy.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "You are not allowed to update this user!" });
        }
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            {
                name,
                phone,
                address
            },
            { new: true }
        );
        res.status(200).json({ message: "Updated Successfully!", updatedCustomer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//TRANSACTION
//Add Transaction
export const addTransaction = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { amount, type, note } = req.body;
        console.log(amount);
        console.log(type);
        console.log(note);
        // Basic validation
        if (!amount || !type) {
            return res.status(400).json({ message: "Amount and type are required" });
        }
        //Find Customer
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        //Push Tranaction
        customer.transaction.push({
            amount,
            type,
            note,
            createdBy: req.user._id,
        });
        //Update Balance
        if (type == "give") {
            customer.balance -= amount;
        }
        else if (type == "receive") {
            customer.balance += amount;
        }
        await customer.save();

        res.status(200).json({
            message: "Transaction added successfully",
            customer,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

};
//Transaction Details
export const transactionDetails=async(req, res)=>{
    try {
    const{customerId, transactionId}=req.params;
    const customer= await Customer.findById(customerId);
    if(!customer){
      return res.status(404).json({message: "This Customer is not found!"});
    }
    const index=customer.transaction.findIndex((t)=>t._id.toString()===transactionId);
    if(index===-1){
      return res.status(404).json({message: "Transaction not found"});
    }
    const transaction=customer.transaction[index];
    res.status(200).json(
      {
        message: "Transaction Detail:",
        transaction
      }
    )

  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
}
//Delete Transaction
export const deleteTransaction=async(req, res)=>{
    try {
        const { customerId, transactionId } = req.params;
        const customer = await Customer.findById(customerId);
        if (!customer) {
          return res.status(404).json(
            {
              message: "This Customer is not found",
            }
          )
        }
        if (req.user.role !== "owner" && customer.createdBy.toString() !== req.user._id.toString()) {
          res.status(403).json({
            message: "You are not allowed to delete this customer's transaction",
        })
        }
        //remove transaction from array
        customer.transaction = customer.transaction.filter((t) => t._id.toString() !== transactionId);
        // recalculate balance
    
        customer.balance = customer.transaction.reduce((total, t) => {
          return t.type === "give" ? total - t.amount : total + t.amount;
        }, 0)
        await customer.save();
        res.status(200).json({ message: "Transaction deleted", customer });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}
//Edit Transaction
export const editTransaction=async(req, res)=>{
    try {
    const { customerId, transactionId } = req.params;
    const{amount, type, note}=req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json(
        {
          message: "This Customer is not found",
        }
      )
    }
    if (req.user.role !== "owner" && customer.createdBy.toString() !== req.user._id.toString()) {
      res.status(403).json({
        message: "You are not allowed to delete this customer's transaction",
      })
    }
    const index=customer.transaction.findIndex((t)=>t._id.toString()===transactionId);
    if(index===-1){
      return res.status(404).json({message: "Transaction not found"});
    }
    //update
    customer.transaction[index].amount=amount;
    customer.transaction[index].type=type;
    customer.transaction[index].note=note;
    customer.balance = customer.transaction.reduce((total, t) => {
      return t.type === "give" ? total - t.amount : total + t.amount;
    }, 0)
    await customer.save();
    res.status(200).json({ message: "Transaction edited", customer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}