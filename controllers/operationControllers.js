const operationControllers = (Operation) => {
  
  const getOperations = async (req,res) => {
    try {
      const {query} = req
      const response = await Operation.find(query)

      //armo el balance
      console.log('response.data de las operaciones',response)
        // es un array de objetos. response [{.amount},{},{}]
        let operations = response
        let totalExpenses = 0
        let totalIncomes=0
        console.log("operations:",operations)
        for (let i = 0; i < operations.length; i++) {
          if (operations[i].operationType == "expense"){
          // Acceder al objeto del arreglo en la posicion "i"
          totalExpenses = totalExpenses+operations[i].amount
          //console.log("totalExpenses",totalExpenses)
          }
          else{
          totalIncomes = totalIncomes+operations[i].amount
          //console.log("totalIncomes",totalIncomes)}
          }}
          let balance = totalIncomes - totalExpenses
          console.log("BALANCE:", balance)
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
        //response.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime())
        return res.json(response)}
        }
      
    } 
    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  } 

   const getOperationByType = async (req,res) => {
    try {
      const {query} = req
      console.log("query:",query)
      if (query.operationType == ('expense')){
        console.log('entró por el true de query')
        const response = await Operation.find(query)
        console.log('response.data de los expneses',response)
        // es un array de objetos. response [{.amount},{},{}]
        let expenses = response
        let totalExpenses = 0
        console.log("expenses:",expenses)
        for (let i = 0; i < expenses.length; i++) {
          // Acceder al objeto del arreglo en la posicion "i"
          totalExpenses = totalExpenses+expenses[i].amount}
          console.log("totalExpenses:", totalExpenses)
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

 const operationsBalance = async (req,res) => {
  try {
    const {query} = req
    const response = await Operation.find(query)
    //armo el balance
    console.log('response.data de las operaciones',response)
      // es un array de objetos. response [{.amount},{},{}]
      let operations = response
      let totalExpenses = 0
      let totalIncomes = 0
      console.log("operations:",operations)
      for (let i = 0; i < operations.length; i++) {
        if (operations[i].operationType == "expense"){
        // Acceder al objeto del arreglo en la posicion "i"
        totalExpenses = totalExpenses+operations[i].amount
        //console.log("totalExpenses",totalExpenses)
        }
        else{
        totalIncomes = totalIncomes+operations[i].amount
        //console.log("totalIncomes",totalIncomes)}
        }}
        let balance = totalIncomes - totalExpenses
        const balanceData = 
       {
        totalIncomes: totalIncomes,
        totalExpenses: totalExpenses,
        balance:balance
       }
        console.log("balanceData:", balanceData)
        console.log("BALANCE:", balance)
        if (response.length == 0){
          return res.status(202).json({message: 'No matches found'})
        } 
        else {
          return res.json(balanceData) }
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
  
return {getOperations,  getOperationByType ,operationsBalance, postOperation, getOperationById,putOperationById, deleteOperationById}  
}

module.exports = operationControllers