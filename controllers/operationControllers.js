const operationControllers = (Operation) => {
  
    const getOperations = async (req,res) => {
      try {
        const {query} = req
        const response = await Operation.find(query)
        if (response.length == 0){
          return res.status(202).json({message: 'No matches found'})
        } 
        else {  
          return res.json(response)
        }
      } 
      catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
        throw err
      }
    } 

    const postOperation = async (req,res) => {
      try {
        const operation = new Operation (req.body)
        await operation.save()
        return res.status(201).json(operation)
      }
      catch (err) {
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
        throw err
      }
    }
  
    const getOperationById = async (req,res) => {
      try {
        const {params} = req
        const response = await Operation.findById(params.operationId)
        if(response == null){
          return res.json({message: "No matches found"})
        }
        else {
          return res.json(response)
        }
      }
      catch (err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
        throw err
      }
    }
  
    const putOperationById = async(req,res) => {
      try {
          const {params,body} = req
          const response = await Operation.updateOne({
            _id: params.operationId
          }, {
            $set: {
                concept: body.concept,
                amount: body.amount,
                date :body.date,
                //operationType:body.operationType,  --> no se debe poder cambiar! armar un mensaje..? ver si lo resuelvo directamente en el front 
            }
          }
          )
        return res.status(202).json(response)
      }
      catch (err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
      }
    }
  
    const deleteOperationById = async(req,res)=>{
       try{
      const {params} = req
      await Operation.findByIdAndDelete(params.operationId)
      return res.status(202).json({message:'Operation succesfully deleted'})
      }
      catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
      }
    }
    
  return {getOperations,  postOperation, getOperationById,putOperationById, deleteOperationById}  
  }
  
  module.exports = operationControllers