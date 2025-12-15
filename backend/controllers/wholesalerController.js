import Wholesaler from "../models/Wholesaler.js";

export const addWholesaler = async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        // Validation base level
        if (!name || !phone) {
            return res.status(400).json({ message: "Name and phone are required " });
        }
        // create a new wholesaler 
        const wholesaler = await Wholesaler.create({
            name,
            phone,
            address,
            createdBy: req.user._id,
        });
        res.status(201).json({
            message: "wholesaler added successfully",
            wholesaler,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server Error" });
    }
};
//
export const wholesalerList = async (req, res) => {
    try {
        
        //not an Owner 
        if (req.user.role != "owner") {
            return res.status(403).json({ message: "Access denied" });
        }
        const wholesalers = await Wholesaler.find().sort({ createdAt: -1 });

        res.json({
            message: "wholesaler fetched successfully",
            wholesalers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//
export const wholesalerDetails = async (req, res) => {
    try {
        const { wholesalerId } = req.params;
        const wholesaler = await Wholesaler.findById(wholesalerId);
        if (!wholesaler) {
            res.status(400).json({ message: "wholesaler not found!" })
        }
        //not an owner
        if (req.user.role !== "owner") {
            return res.status(403).json({ message: "Access denied" });
        }
        res.status(200).json(
            {
                message: "wholesaler detail fetched successfully",
                wholesaler: wholesaler,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//
export const deleteWholesaler = async (req, res) => {
    try {
        const { wholesalerId } = req.params;
        const wholesaler = await Wholesaler.findById(wholesalerId);
        if (!wholesaler) {
            return res.status(404).json(
                {
                    message: "This wholesaler is not found",
                }
            )
        }
        if (req.user.role !== "owner") {
            return res.status(403).json({
                message: "You are not allowed to delete this wholesaler",
            })
        }
        await Wholesaler.findByIdAndDelete(wholesalerId);
        res.status(200).json({
            message: "This wholesaler is deleted! ",
            wholesaler
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}
//
export const editWholesaler = async (req, res) => {
    try {
        const { wholesalerId } = req.params;
        const { name, phone, address } = req.body;
        const wholesaler = await Wholesaler.findById(wholesalerId);
        if (!wholesaler) {
            return res.status(400).json({ message: "wholesaler not found to update!" });
        }
        if (req.user.role !== "owner") {
            return res.status(404).json({ message: "You are not allowed to update this user!" });
        }
        const updatedwholesaler = await Wholesaler.findByIdAndUpdate(
            wholesalerId,
            {
                name,
                phone,
                address
            },
            { new: true }
        );
        res.status(200).json({ message: "Updated Successfully!", updatedwholesaler });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//TRANSACTION
//Add Transaction
export const addTransaction = async (req, res) => {
    try {
        const { wholesalerId } = req.params;
        const { amount, type, note } = req.body;
        console.log(amount);
        console.log(type);
        console.log(note);
        // Basic validation
        if (!amount || !type) {
            return res.status(400).json({ message: "Amount and type are required" });
        }
        //Find wholesaler
        const wholesaler = await Wholesaler.findById(wholesalerId);
        if (!wholesaler) {
            return res.status(404).json({ message: "wholesaler not found" });
        }
        //Push Tranaction
        wholesaler.transaction.push({
            amount,
            type,
            note,
            createdBy: req.user._id,
        });
        //Update Balance
        if (type == "give") {
            wholesaler.balance += amount;
        }
        else if (type == "receive") {
            wholesaler.balance -= amount;
        }
        await wholesaler.save();

        res.status(200).json({
            message: "Transaction added successfully",
            wholesaler,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

};

//Transaction Details
export const transactionDetails=async(req, res)=>{
    try {
    const{wholesalerId, transactionId}=req.params;
    const wholesaler= await Wholesaler.findById(wholesalerId);
    if(!wholesaler){
      return res.status(404).json({message: "This wholesaler is not found!"});
    }
    const index=wholesaler.transaction.findIndex((t)=>t._id.toString()===transactionId);
    if(index===-1){
      return res.status(404).json({message: "Transaction not found"});
    }
    const transaction=wholesaler.transaction[index];
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
        const { wholesalerId, transactionId } = req.params;
        const wholesaler = await Wholesaler.findById(wholesalerId);
        if (!wholesaler) {
          return res.status(404).json(
            {
              message: "This wholesaler is not found",
            }
          )
        }
        if (req.user.role !== "owner") {
          res.status(403).json({
            message: "You are not allowed to delete this wholesaler's transaction",
        })
        }
        //remove transaction from array
        wholesaler.transaction = wholesaler.transaction.filter((t) => t._id.toString() !== transactionId);
        // recalculate balance
    
        wholesaler.balance = wholesaler.transaction.reduce((total, t) => {
          return t.type === "give" ? total + t.amount : total - t.amount;
        }, 0)
        await wholesaler.save();
        res.status(200).json({ message: "Transaction deleted", wholesaler });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}
//Edit Transaction
export const editTransaction=async(req, res)=>{
    try {
    const { wholesalerId, transactionId } = req.params;
    const{amount, type, note}=req.body;
    const wholesaler = await Wholesaler.findById(wholesalerId);
    if (!wholesaler) {
      return res.status(404).json(
        {
          message: "This wholesaler is not found",
        }
      )
    }
    if (req.user.role !== "owner" && wholesaler.createdBy.toString() !== req.user._id.toString()) {
      res.status(403).json({
        message: "You are not allowed to delete this wholesaler's transaction",
      })
    }
    const index=wholesaler.transaction.findIndex((t)=>t._id.toString()===transactionId);
    if(index===-1){
      return res.status(404).json({message: "Transaction not found"});
    }
    //update
    wholesaler.transaction[index].amount=amount;
    wholesaler.transaction[index].type=type;
    wholesaler.transaction[index].note=note;
    wholesaler.balance = wholesaler.transaction.reduce((total, t) => {
      return t.type === "give" ? total + t.amount : total - t.amount;
    }, 0)
    await wholesaler.save();
    res.status(200).json({ message: "Transaction edited", wholesaler });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}