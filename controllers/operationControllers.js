const operationControllers = (Operation) => {
  
  const getOperations = async (req,res) => {
    try {
      const {query} = req
      const response = await Operation.find(query)
      if (response.length == 0){
        return res.status(202).json({message: 'No matches found'})
      } 
      else {
        if (response.length < 10){
        console.log("hay", response.length, 'operaciones')
        response.reverse();//Asi muestra los ultimos 10 registrados pero no significa que sean las ultimas 10 operaciones segun la fecha cronologica!
        return res.json(response) }
        else{
        console.log("hay", response.length, 'operaciones')
        response.reverse(); //Asi muestra los ultimos 10 registrados pero no significa que sean las ultimas 10 operaciones segun la fecha cronologica!
        response.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime())
        return res.json(response)}
        }
      
    } 
    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  } 

   const getExpenses = async (req,res) => {
    try {
      const {query} = req
      console.log("query:",query)
      if (query.operationType == ('expense')){
        console.log('entró por el true de query')
        const response = await Operation.find(query)
        if (response.length == 0){
          return res.status(202).json({message: 'No matches found'})
        } 
        else {
          return res.json(response) 
      }}
        else{
          if (query.operationType == ('income')){
            console.log('entró por el else de query')
            const response = await Operation.find(query)
            if (response.length == 0){
              return res.status(202).json({message: 'No matches found'})
            } 
            else {
              return res.json(response) 
              console.log("get OP response:", response)
          }}
        } 
    }

    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  } 

 /*  const getIncomes = async (req,res) => {
    try {
      const {query} = req
      console.log("query:",query)
      if (query.operationType == ('income')){
        console.log('entró por el true de query')
        const response = await Operation.find(query)
        if (response.length == 0){
          return res.status(202).json({message: 'No matches found'})
        } 
        else {
          return res.json(response) 
      }}
    } 
    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  } */

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
              //operationType:body.operationType,  --> no se debe poder cambiar! aramr un mensaje..? ver si lo resuelvo directamente en el front 
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
  
return {getOperations,  getExpenses , postOperation, getOperationById,putOperationById, deleteOperationById}  
}

module.exports = operationControllers