export const clientData = () =>{
    return{
        client_id: 0,
        client_name: "",
        address: "",
        contact_name: "",
        contact_no: "",
        active_vouchers: 0,
        used_vouchers: 0,
        last_order_date: "",
        last_order_amount: 0,
    }
};


export const voucherData = () =>{
    return {
        voucher_id: "",
        client_id: 0,
        initial_amount: 0,
        balance: 0,
        start_date: "",
        end_date: "",
        status: "",
        last_transaction_id: "",
        last_used: "",
    };
}


export const attendantData = () =>{
    return {
        atdt_id: 0,
        profile: "",
        first_name: "",
        last_name: "",
        employee_id: "",
        location_id: "",
        password: "",
        vouchers: 0,
    };
}

export const transactionData = () => {
    return{
        txn_id: 0,
        txn_date: "",
        voucher_id: "",
        id: 0,
        initial_amount: 0,
        redeem_amount: 0,
        left_balance: 0,
    };
}