import Bill from "../models/Bill.js";

export const totalSales=async(req, res)=>{
    try {
        const {selectedDate} = req.body;
        const date = new Date(selectedDate); 
        const start = new Date(date.setHours(0, 0, 0, 0));
        const end = new Date(date.setHours(23, 59, 59, 999));

        const bills=await Bill.find(
            {
                createdAt:{
                    $gte: start,
                    $lte:end
                }
            }
        );

        res.status(200).json(
            bills
        )
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}