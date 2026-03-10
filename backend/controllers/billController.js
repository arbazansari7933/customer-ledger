import Bill from "../models/Bill.js";
import Customer from "../models/Customer.js";

export const createBill = async (req, res) => {
    try {
        const { name, phone, address, items, paid = 0 } = req.body;
        if (!name || !phone || !items || items.length === 0) {
            return res.status(400).json({
                message: "Name and Phone Number required !"
            })
        }
        let total = 0;
        const processedItems = items.map(item => {
            const finalRate = item.mrp - (item.mrp * item.discount / 100);
            const amount = finalRate * item.qty;

            total += amount;

            return {
                itemName: item.itemName,
                qty: item.qty,
                mrp: item.mrp,
                discount: item.discount,
                finalRate,
                amount
            };
        });

        const due = total - paid;
        const status = due > 0 ? "due" : "paid";
        //create new bill
        const bill = await Bill.create({
            name,
            phone,
            address,
            items: processedItems,
            total,
            paid,
            due,
            status,
            createdBy: req.user._id

        });
        if (status == "due") {
            const customer = await Customer.findOne({ phone });
            if (!customer) {
                await Customer.create({
                    name,
                    phone,
                    address,
                    createdBy: req.user._id,
                    balance: -due,
                    transaction: [{
                        amount: due,
                        type: "give",
                        note: "Bill due",
                        createdBy: req.user._id
                    }]
                });
            }
            else {
                customer.transaction.push({
                    amount: due,
                    type: "give",
                    note: "Bill due",
                    createdBy: req.user._id

                });
                customer.balance -= due;
                await customer.save();
            }
        }
        res.status(201).json({
            message: "Bill created successfully !",
            bill
        });
    } catch (error) {
        res.status(500).json({ message: "server Error" });
    }
}

export const getAllBills = async (req, res) => {
    try {
        let bills;
        bills = await Bill.find().sort({ createdAt: -1 });
        return res.json({
            message: "Bills fetched successfully !",
            bills
        })
    } catch (error) {
        res.status(500).json({ message: "server Error" });
    }
}

export const billDetails= async(req, res)=>{
    try {
        const {billId}=req.params;
        const bill=await Bill.findById(billId);
        if(!bill){
            return res.status(400).json({
                message: "Bill Not Found!"
            })
        }
        res.status(200).json({
            message:"Bill Details fetched!",
            bill
        })
    } catch (error) {
        res.status(500).json({ message: "server Error" });
    }
}

export const deleteBill=async (req, res) => {
    try {
        const {billId}=req.params;
        const bill=await Bill.findById(billId);
        if(!bill){
            return res.status(400).json({
                message: "Bill Not Found!"
            })
        }
        await Bill.findByIdAndDelete(billId);
        res.status(200).json({
            message:"Bill Deleted successfully!",
            bill
        })
    } catch (error) {
        res.status(500).json({ message: "server Error" });
    }
}