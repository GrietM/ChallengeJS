const operationControllers = (Operation) => {
  
  const getOperations = async (req,res) => {
    try {
      const {query} = req
      const response = await Operation.find(query)
      response.reverse();//Asi muestra los ultimos 10 registrados pero no significa que sean las ultimas 10 operaciones segun la fecha cronologica!
      // response.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()) 
      return res.json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
        throw err
    }
  } 

  const getOperationsByUser = async (req,res) => {
    try {
      const {query} = req
      const response = await Operation.find(params.user)
      //const response = await Operation.find(query)
      return res.json(response)
    }
    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  } 

  const getOperationsByType = async (req,res) => {
    try {
      const {query} = req
      if (query.operationType == ('expense')){
        const response = await Operation.find(query)
        //const response = await Operation.find(params.user)
        response.reverse();
        return res.json(response) 
      }
      else{
          if (query.operationType == ('income')){
            const response = await Operation.find(query)
            //const response = await Operation.find(params.user)
            response.reverse();
            return res.json(response) 
          }
      } 
    }
    catch(err){
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  } 

 const operationsBalance = async (req,res) => {
  try {
    const {query} = req
    const response = await Operation.find(query)     

    let operations = response
    let totalExpenses = 0
    let totalIncomes = 0

      for (let i = 0; i < operations.length; i++) {
        if (operations[i].operationType == "expense"){
        totalExpenses = totalExpenses+operations[i].amount
        }
        else{
        totalIncomes = totalIncomes+operations[i].amount
        }
      }

    let balance = totalIncomes - totalExpenses
    const balanceData = 
      {
      totalIncomes: totalIncomes,
      totalExpenses: totalExpenses,
      balance:balance
      }

        if (response.length == 0){
          return res.status(202).json({message: 'No matches found'})
        } 
        else {
          return res.json(balanceData) 
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
  
return {getOperations, getOperationsByUser, getOperationsByType ,operationsBalance, postOperation, getOperationById,putOperationById, deleteOperationById}  
}

module.exports = operationControllers