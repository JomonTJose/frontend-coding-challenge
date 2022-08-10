import Absences from "../models/absences.model"

//get All Absences
export const absences = async (req: any, res: any) => {
  try {
    const absencesRes = await Absences.aggregate([
      {
        $lookup: {
          from: "members",
          localField: "userId",
          foreignField: "userId",
          as: "memInfo",
        },
      },
    ])

    console.log(absencesRes)
    res.status(200).json(absencesRes)
  } catch (error: any) {
    console.log(error)
    res.status(200).json(error)
  }
}