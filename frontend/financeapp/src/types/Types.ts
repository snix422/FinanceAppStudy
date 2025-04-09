export interface IBudgetItem {
    id:number,
    title:string,
    totalAmount:number,
    userEmail:string,
    userFullName:string,
    startDate:string,
    endDate:string,
    expenses:IExpenseItem[]
}

export interface IExpenseItem {
    id:number,
    description:string,
    amount:number,
    budgetId:number,
    budgetTitle:string,
    categoryId:number,
    categoryName:string
}

export interface IUser {
    id:number,
    email:string
    passwordHash:string,
    fullName:string,
    createdAt:string,
    budgets: null | IBudgetItem[],
    roleId:number,
    role:null | string
}