import { useEffect, useState } from 'react'
import axios from 'axios'
import converter from 'number-to-words';
import './App.css'

function App() {
  const [items,setItems] = useState([])
  const [input,setInput] = useState({})
  const [taxType, setTaxType] = useState(false)
  const [count, setCount] = useState()
  const [invoce, setInvoice] = useState(false)
  const [amount,setAmount] = useState({
    total_amount_1:"",
    total_amount_2:"",
    total_Shipping_amount_1:"",
    total_Shipping_amount_2:"",
    tax_amount_1:"",
    tax_amount_2:"",
    shipping_tax_amount_1:"",
    shipping_tax_amount_2:"",
    grand_total:"",
    grand_total_tax:""
  })
  useEffect(()=>{
    function xyz(){
      for(let i = 1; i<=count;i++){
        const it = {
          sl_no:i
        }
        items.push(it)
      }
    }
    xyz()
  },[count])
  function onChangeInput(e){
    const {name, value} = e.target;
    setInput((prev)=>({
      ...prev,[name]:value
    }))
  }
  const generateInvoice = async (e) =>{
    
    e.preventDefault()
    try{
      console.log(input);
      if(input.place_of_supply === input.place_of_delivery){
        amount.tax_amount_1 = ((input.item_price_1 * input.item_quantity_1) - (input.discount_1 * 0.01))* 0.09
        amount.shipping_tax_amount_1 = (input.shipping_charge_1 * input.item_quantity_1)* 0.09
        amount.tax_amount_2 = ((input.item_price_2 * input.item_quantity_2) - (input.discount_2 * 0.01))* 0.09
        amount.shipping_tax_amount_2 = (input.shipping_charge_2 * input.item_quantity_2)* 0.09

        amount.total_amount_1 = ((input.item_price_1 * input.item_quantity_1) - (input.discount_1 * 0.01)) + (amount.tax_amount_1 * 2)
        amount.total_Shipping_amount_1 = (input.shipping_charge_1 * input.item_quantity_1) + (amount.shipping_tax_amount_1 * 2)
        amount.total_amount_2 = ((input.item_price_2 * input.item_quantity_2) - (input.discount_2 * 0.01)) + (amount.tax_amount_2 * 2)
        amount.total_Shipping_amount_2 = (input.shipping_charge_2 * input.item_quantity_2) + (amount.shipping_tax_amount_2 * 2)

        amount.grand_total_tax = (amount.tax_amount_1 * 2) + (amount.shipping_tax_amount_1 * 2) + (amount.tax_amount_2 * 2) + (amount.shipping_tax_amount_2 * 2)

        setTaxType(true)
      } else{
        amount.tax_amount_1 = ((input.item_price_1 * input.item_quantity_1) - (input.discount_1 * 0.01))* 0.18
        amount.shipping_tax_amount_1 = (input.shipping_charge_1 * input.item_quantity_1)* 0.18
        amount.tax_amount_2 = ((input.item_price_2 * input.item_quantity_2) - (input.discount_2 * 0.01))* 0.18
        amount.shipping_tax_amount_2 = (input.shipping_charge_2 * input.item_quantity_2)* 0.18

        amount.total_amount_1 = ((input.item_price_1 * input.item_quantity_1 - (input.discount_1 * 0.01))) + amount.tax_amount_1
        amount.total_Shipping_amount_1 = (input.shipping_charge_1 * input.item_quantity_1) + amount.shipping_tax_amount_1
        amount.total_amount_2 = ((input.item_price_2 * input.item_quantity_2) - (input.discount_2 * 0.01)) + amount.tax_amount_2
        amount.total_Shipping_amount_2 = (input.shipping_charge_2 * input.item_quantity_2) + amount.shipping_tax_amount_2

        amount.grand_total_tax = amount.tax_amount_1 + amount.shipping_tax_amount_1 + amount.tax_amount_2 + amount.shipping_tax_amount_2
      }
      amount.grand_total = amount.total_amount_1 + amount.total_amount_2 + amount.total_Shipping_amount_1 + amount.total_Shipping_amount_2
      
      setInvoice(true);
    }catch(err){
      console.log(err.message);
    }

  }
  useEffect(()=>{
    async function abc(){
      const res = await axios.get('http://localhost:3000/')
      console.log(res.data)
    }
    abc()
  },[])
  return (
    <>
      <div style={{width:'100%'}}>
        <p className='text-center fs-4 pb-2'><b>Tax Invoice / Bill of Supply / Cash Memo</b></p>
        <form action="" onSubmit={generateInvoice} >
          <div className='d-flex justify-content-evenly'>
            <div>
              <div>
                <strong><u>Seller details:</u></strong>
                <div className='mb-2'>
                  <label htmlFor="">Name</label>
                  <div className='d-flex justify-content-between'>
                    <input required onChange={onChangeInput} type="text" name="seller_fname" id="" placeholder='First name' />
                    <input onChange={onChangeInput} type="text" name="seller_mname" id="" placeholder='Middle name' />
                    <input required onChange={onChangeInput} type="text" name="seller_lname" id="" placeholder='Last name' />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Address</label>
                  <div className='d-flex justify-content-between'>
                    <input required onChange={onChangeInput} type="text" name="seller_city" id="" placeholder='City' />
                    <input required onChange={onChangeInput} type="text" name="seller_state" id="" placeholder='State' />
                    <input required onChange={onChangeInput} type="text" name="seller_pincode" id="" placeholder='Pincode' />
                  </div>
                </div>
                <div className='d-flex'>
                  <div className='me-2'>
                    <label htmlFor="">PAN No.</label>
                    <input required onChange={onChangeInput} type="text" name="seller_pan_no" id="" placeholder='Enter PAN number'/>
                  </div>
                  <div >
                    <label htmlFor="">GST Registration No.</label>
                    <input required onChange={onChangeInput} type="text" name="seller_gst_no" id="" placeholder='Enter GST Registration No.' />
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <strong><u>Billing Details:</u></strong>
                <div className='mb-2'>
                  <label htmlFor="">Name</label>
                  <div className='d-flex justify-content-between'>
                    <input required onChange={onChangeInput} type="text" name="billing_fname" id="" placeholder='First name' />
                    <input onChange={onChangeInput} type="text" name="billing_mname" id="" placeholder='Middle name' />
                    <input required onChange={onChangeInput} type="text" name="billing_lname" id="" placeholder='Last name' />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Address</label>
                  <div className='d-flex justify-content-between'>
                    <input required onChange={onChangeInput} type="text" name="billing_city" id="" placeholder='City' />
                    <input required onChange={onChangeInput} type="text" name="billing_state" id="" placeholder='State' />
                    <input required onChange={onChangeInput} type="text" name="billing_pincode" id="" placeholder='Pincode' />
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor="">State/UT Code</label>
                  <input required onChange={onChangeInput} type="text" name="billing_state_utcode" id="" placeholder='Enter State/UT Code' />
                </div>
              </div>
              <hr />
              <div>
                <strong><u>Shipping Details:</u></strong>
                <div className='mb-2'>
                  <label htmlFor="">Name</label>
                  <div className='d-flex justify-content-between'>
                    <input required onChange={onChangeInput} type="text" name="shipping_fname" id="" placeholder='First name' />
                    <input onChange={onChangeInput} type="text" name="shipping_mname" id="" placeholder='Middle name' />
                    <input required onChange={onChangeInput} type="text" name="shipping_lname" id="" placeholder='Last name' />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Address</label>
                  <div className='d-flex justify-content-between'>
                    <input required onChange={onChangeInput} type="text" name="shipping_city" id="" placeholder='City' />
                    <input required onChange={onChangeInput} type="text" name="shipping_state" id="" placeholder='State' />
                    <input required onChange={onChangeInput} type="text" name="shipping_pincode" id="" placeholder='Pincode' />
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor="">State/UT Code</label>
                  <input required onChange={onChangeInput} type="text" name="shipping_state_utcode" id="" placeholder='Enter State/UT Code' />
                </div>
              </div>
              <hr />
              <div className=''>
                <div className='d-flex flex-column mb-1'>
                  <label htmlFor="">Place of Supply</label>
                  <input required onChange={onChangeInput} type="text" name="place_of_supply" id="" placeholder='Enter Place of Supply' />
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor="">Place of Delivery</label>
                  <input required onChange={onChangeInput} type="text" name="place_of_delivery" id="" placeholder='Enter Place of Delivery' />
                </div>
              </div>
            </div>
            <div>
            
              <div>
                  <strong><u>Order details:</u></strong>
                  <div className='mb-2'>                    
                    <div className='d-flex flex-column'>
                      <label htmlFor="">Order No</label>
                      <input required onChange={onChangeInput} type="text" name="order_no" id="" placeholder='Enter Order No.' />
                    </div>
                    <div className='d-flex flex-column'>
                      <label htmlFor="">Order Date</label>
                      <input required onChange={onChangeInput} type="date" name="order_date" id="" placeholder='Enter Order No.' />
                    </div>
                  </div>
                </div>
                <hr />

                <div>
                  <strong><u>Invoice details:</u></strong>
                  <div className='mb-2 mt-2'>
                    <div className=''>
                      <div className='d-flex justify-content-between'>
                        <input required onChange={onChangeInput} type="text" name="invoice_no" id="" placeholder='Enter Invoice No.' className='me-2' />
                        <input required onChange={onChangeInput} type="date" name="invoice_date" id="" />
                      </div>
                      <input required onChange={onChangeInput} type="text" name="invoice_detail" id="" placeholder='Enter Invoice Details' className='w-100 mt-2' />
                    </div>
                    <div className='mt-3 text-end'>
                      <label htmlFor="" className='me-2'>Reverse Charge:</label>
                      <select onChange={onChangeInput} name="reverse_charge" required id="" className='p-1'>
                        <option value="">Select Reverse Charge</option>
                        <option value="yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <strong><u>Items details:</u></strong>
                  {/* <div className='d-flex flex-column my-2'>
                    <label htmlFor="itemNumber">Enter how many types of items (Excluding similler items)</label>
                    <input required type="number" placeholder='Enter number of Item type' id='itemNumber' onChange={returnItemDivs}/>
                  </div>
                  <p>Total items type is - {items.length}</p> */}
                        <div className='mt-2'>
                          <label htmlFor="">Item No. 1 ~</label>

                          <input required onChange={onChangeInput} type="text" name="item_description_1" id="" placeholder='Enter Item Description' className='w-100' />
                          <div className='mt-2'>
                            <input required onChange={onChangeInput} type="number" name="item_price_1" id="" placeholder='Unit Price' className='me-2' />
                            <input required onChange={onChangeInput} type="number" name="shipping_charge_1" id="" placeholder='Shipping Charge' />
                          </div>
                          <div className='mt-2'>
                            <input required onChange={onChangeInput} type="number" name="discount_1" id="" placeholder='Discountcin Percent' className='me-2' />
                            <input required onChange={onChangeInput} type="number" name="item_quantity_1" id="" placeholder='Item Quantity' />
                          </div>
                        </div>
                        <div className='mt-2'>
                          <label htmlFor="">Item No. 2 ~</label>

                          <input required onChange={onChangeInput} type="text" name="item_description_2" id="" placeholder='Enter Item Description' className='w-100' />
                          <div className='mt-2'>
                            <input required onChange={onChangeInput} type="number" name="item_price_2" id="" placeholder='Unit Price' className='me-2' />
                            <input required onChange={onChangeInput} type="number" name="shipping_charge_2" id="" placeholder='Shipping Charge' />
                          </div>
                          <div className='mt-2'>
                            <input required onChange={onChangeInput} type="number" name="discount_2" id="" placeholder='Discount in Percent' className='me-2' />
                            <input required onChange={onChangeInput} type="number" name="item_quantity_2" id="" placeholder='Item Quantity' />
                          </div>
                        </div>
                </div>
            </div>
          </div>
          <hr />
          <div className='text-center mt-4'>
            <button type='reset' className='btn btn-secondary me-3'>Reset</button>
            <button type='submit' className='btn btn-info'>Generate</button>
          </div>
        </form>
      </div>
      <hr />
      {invoce?
      <section className='d-flex justify-content-center mt-5 invoice-sheet'>
        <div className='px-5 py-2' style={{background:'white', width:'880px', height:'fit-content'}}>
          <div className='d-flex justify-content-between align-items-center'>
            <svg height="auto" viewBox="15.93 17.46 353.52 101" width="200" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="m192.64 99.75c-16.55 12.21-40.54 18.71-61.2 18.71-28.96 0-55.03-10.7-74.76-28.52-1.55-1.4-.17-3.31 1.7-2.23 21.29 12.39 47.62 19.85 74.81 19.85 18.34 0 38.51-3.81 57.06-11.68 2.8-1.19 5.14 1.84 2.41 3.87z" fill="#f8981d"/><path d="m199.52 91.89c-2.12-2.71-13.99-1.29-19.33-.65-1.62.19-1.87-1.22-.41-2.24 9.47-6.65 25-4.73 26.8-2.51 1.82 2.25-.48 17.81-9.35 25.24-1.37 1.14-2.66.53-2.06-.98 2-4.99 6.47-16.16 4.35-18.87z" fill="#f8981d"/><path d="m180.57 42v-6.47c0-.98.75-1.64 1.64-1.64h28.98c.93 0 1.67.67 1.67 1.63v5.54c0 .93-.79 2.14-2.18 4.07l-15.01 21.43c5.57-.13 11.47.7 16.53 3.55 1.14.64 1.45 1.59 1.54 2.52v6.9c0 .95-1.04 2.05-2.13 1.48-8.92-4.67-20.76-5.18-30.62.06-1.01.54-2.06-.55-2.06-1.5v-6.56c0-1.05.02-2.84 1.08-4.44l17.39-24.95h-15.14c-.93 0-1.67-.66-1.67-1.63zm-105.7 40.38h-8.82c-.84-.05-1.51-.69-1.58-1.49v-45.25c0-.91.77-1.63 1.71-1.63h8.21c.86.04 1.55.69 1.6 1.52v5.91h.17c2.14-5.71 6.17-8.38 11.6-8.38s8.97 2.67 11.44 8.38c2.14-5.71 6.99-8.38 12.18-8.38 3.7 0 7.74 1.52 10.2 4.95 2.8 3.81 2.22 9.33 2.22 14.19v28.55c0 .9-.77 1.63-1.71 1.63h-8.81c-.88-.06-1.58-.76-1.58-1.62v-23.99c0-1.9.16-6.67-.25-8.47-.66-3.05-2.63-3.9-5.18-3.9-2.14 0-4.36 1.43-5.27 3.71-.91 2.29-.82 6.09-.82 8.66v23.98c0 .9-.76 1.63-1.7 1.63h-8.81c-.88-.06-1.58-.76-1.58-1.62v-23.99c0-5.05.81-12.47-5.44-12.47s-6.09 7.24-6.09 12.47v23.98c0 .9-.76 1.63-1.7 1.63zm162.94-49.32c13.08 0 20.16 11.24 20.16 25.52s-7.82 24.76-20.16 24.76-19.83-11.24-19.83-25.23 7.08-25.04 19.83-25.04zm.08 9.24c-6.5 0-6.91 8.85-6.91 14.38s-.08 17.33 6.83 17.33 7.16-9.52 7.16-15.33c0-3.81-.16-8.38-1.32-12-.99-3.14-2.96-4.38-5.76-4.38zm37.05 40.08h-8.78c-.88-.06-1.58-.76-1.58-1.62v-45.27c.06-.83.79-1.48 1.68-1.48h8.18c.77.04 1.4.56 1.57 1.27v6.92h.17c2.47-6.19 5.92-9.14 12.01-9.14 3.95 0 7.82 1.43 10.29 5.33 2.3 3.62 2.3 9.71 2.3 14.09v28.47c-.1.8-.82 1.43-1.69 1.43h-8.84c-.82-.05-1.47-.65-1.57-1.43v-24.57c0-4.95.58-12.19-5.51-12.19-2.14 0-4.12 1.43-5.1 3.62-1.23 2.76-1.4 5.52-1.4 8.57v24.36c-.02.9-.78 1.63-1.72 1.63zm31.35-3.59c0-2.28 1.94-4.12 4.34-4.12s4.34 1.85 4.34 4.12-1.94 4.12-4.34 4.12-4.34-1.85-4.34-4.12zm-148.82-18.02c0 3.44.08 6.3-1.65 9.35-1.4 2.48-3.63 4.01-6.1 4.01-3.38 0-5.36-2.58-5.36-6.39 0-7.51 6.74-8.87 13.11-8.87v1.91zm8.89 21.49c-.58.52-1.42.56-2.08.21-2.93-2.43-3.45-3.56-5.05-5.87-4.84 4.93-8.27 6.41-14.54 6.41-7.42 0-13.2-4.58-13.2-13.74 0-7.16 3.88-12.02 9.4-14.41 4.78-2.1 11.46-2.48 16.58-3.05v-1.14c0-2.1.17-4.58-1.07-6.39-1.07-1.62-3.13-2.29-4.95-2.29-3.36 0-6.35 1.72-7.09 5.29-.15.79-.73 1.58-1.53 1.62l-8.54-.92c-.72-.16-1.52-.74-1.32-1.84 1.96-10.37 11.33-13.5 19.71-13.5 4.29 0 9.9 1.14 13.28 4.39 4.29 4.01 3.88 9.35 3.88 15.17v13.73c0 4.13 1.72 5.94 3.33 8.17.56.8.69 1.76-.03 2.34-1.8 1.51-5 4.29-6.76 5.86l-.02-.02zm-124.46-21.49c0 3.44.08 6.3-1.65 9.35-1.4 2.48-3.63 4.01-6.1 4.01-3.38 0-5.36-2.58-5.36-6.39 0-7.51 6.74-8.87 13.11-8.87v1.91zm8.89 21.49c-.58.52-1.43.56-2.08.21-2.93-2.43-3.45-3.56-5.05-5.87-4.84 4.93-8.27 6.41-14.53 6.41-7.42 0-13.2-4.58-13.2-13.74 0-7.16 3.88-12.02 9.4-14.41 4.78-2.1 11.46-2.48 16.58-3.05v-1.14c0-2.1.16-4.58-1.07-6.39-1.07-1.62-3.13-2.29-4.95-2.29-3.36 0-6.35 1.72-7.09 5.29-.15.79-.73 1.58-1.53 1.62l-8.54-.92c-.72-.16-1.52-.74-1.32-1.84 1.96-10.37 11.32-13.5 19.71-13.5 4.29 0 9.9 1.14 13.28 4.39 4.29 4.01 3.88 9.35 3.88 15.17v13.73c0 4.13 1.72 5.94 3.33 8.17.56.8.69 1.76-.03 2.34-1.8 1.51-5 4.29-6.76 5.86l-.02-.02zm286.83-48.18h3.52c.75 0 1.51.65 1.51 1.38v6.71c2.46-5.24 6.44-9.04 12.56-9.04 4.77 0 8.35 1.71 10.97 5.41 2.78 3.99 3.27 9.51 3.27 14.45v27.98c0 .74-.76 1.39-1.51 1.39h-4.1c-.75 0-1.51-.65-1.51-1.39v-27.98c0-2.76-.17-6.37-1.39-8.84-1.18-2.55-3.85-4.56-6.38-4.55-2.63 0-6.04 1.93-8.15 4.94-2.53 3.61-3.19 7.6-3.19 12.17v24.31c0 .69-.75 1.35-1.51 1.35h-4.1c-.76 0-1.52-.69-1.51-1.39v-45.51c0-.74.75-1.39 1.51-1.39zm-18.03-12.45c0-2.3 1.97-4.17 4.39-4.17s4.39 1.87 4.39 4.17-1.97 4.17-4.39 4.17-4.39-1.87-4.39-4.17zm6.47 60.74h-4.15c-.75 0-1.51-.66-1.51-1.38l.02-45.31c0-.73.76-1.39 1.5-1.39h4.13c.75 0 1.51.66 1.51 1.39v45.32c0 .73-.75 1.37-1.5 1.38z" fill="#231f20"/></g></svg>
            <div >
              <b className='fs-5'>Tax Invoice/Bill of Supply/Cash Memo</b>
              <p className='text-end'>(Original for Recipent)</p>
            </div>
          </div>
          <div className='d-flex justify-content-between mt-5'>
            <div className='text-start'>
              <strong>Sold By:</strong>
              <div>
                <p className='m-0 p-0'>{input.seller_fname} {input.seller_mname?input.seller_mname:null} {input.seller_lname}</p>
                <p> {input.seller_city}, {input.seller_state}, {input.seller_pincode}, IN</p>
                <div>
                  <p className='m-0 p-0'><strong>PAN No:</strong> {input.seller_pan_no}</p>
                  <p className='m-0 p-0'><strong>GST Resistation No:</strong> {input.seller_gst_no}</p>
                </div>
              </div>

            </div>
            <div className='text-end'>
              <strong>Billing Address:</strong>
              <div>
                <p className='m-0 p-0'>{input.billing_fname} {input.billing_mname?input.billing_mname:null} {input.billing_lname}</p>
                <p className='m-0'> {input.billing_city}, {input.billing_state}, {input.billing_pincode}, IN</p>
                <div>
                  <p className='m-0 p-0'><strong>State/UT Code:</strong> {input.billing_state_utcode}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-between mt-3'>
            <div className='d-flex flex-column justify-content-end'>
              <p className='m-0'><strong>Order Number:</strong> {input.order_no}</p>
              <p><strong>Order Date:</strong> {input.order_date}</p>
            </div>
            <div className='text-end'>
              <strong>Shipping Address:</strong>
              <div>
                <p className='m-0 p-0'>{input.shipping_fname} {input.shipping_mname?input.shipping_mname:null} {input.shipping_lname}</p>
                <p className='m-0'> {input.shipping_city}, {input.shipping_state}, {input.shipping_pincode}, IN</p>
                <div>
                  <p className='m-0 p-0'><strong>State/UT Code:</strong> {input.shipping_state_utcode}</p>
                  <p className='m-0 p-0'><strong>Place of Supply:</strong> {input.place_of_supply}</p>
                  <p className='m-0 p-0'><strong>Place of Delivery:</strong> {input.place_of_delivery}</p>
                  <p className='m-0 p-0'><strong>Invoice Number:</strong> {input.invoice_no}</p>
                  <p className='m-0 p-0'><strong>Invoice Details:</strong> {input.invoice_detail}</p>
                  <p className='m-0 p-0'><strong>Invoice Date:</strong> {input.invoice_date}</p>
                </div>
              </div>
            </div>
          </div>
          <table className='mt-4'>
            <caption>
              Whether Tax is payable under reverse charge - {input.reverse_charge}
            </caption>
            <thead>
              <tr>
                <th scope="col" style={{width:'50px'}}>SL. NO</th>
                <th scope="col" style={{width:'100%'}} >Description</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Net Amount</th>
                <th scope="col">Tax Rate</th>
                <th scope="col">Tax Type</th>
                <th scope="col">Tax Amount</th>
                <th scope="col">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td >
                  <p>{input.item_description_1}</p>
                  <p className='m-0'>Shipping Charge</p>
                </td>
                <th className=''>
                  <p>₹ {input.item_price_1}</p>
                  <p className='m-0'>₹ {input.shipping_charge_1}</p>
                </th>
                <th>{input.item_quantity_1}</th>
                <th>
                  <p>₹ {(input.item_price_1*input.item_quantity_1) - (input.discount_1 * 0.01)}</p>
                  <p className='m-0'>₹ {input.shipping_charge_1*input.item_quantity_1 }</p>
                </th>
                <th>
                  {taxType?
                  <>
                  <p>9%</p>
                  <p>9%</p>
                  <p>9%</p>
                  <p className='m-0'>9%</p>
                  </>
                  :
                  <>
                  <p>18%</p>
                  <p className='m-0'>18%</p>
                  </>
                  }
                </th>
                <th>
                  {taxType?
                    <>
                    <p>CGST</p>
                    <p>SGST</p>
                    <p>CGST</p>
                    <p className='m-0'>SGST</p>
                    </>
                    :
                  <>
                  <p>IGST</p>
                  <p className='m-0'>IGST</p>
                  </>
                  }
                </th>
                <th>
                  {taxType?
                    <>
                    <p>{amount.tax_amount_1}</p>
                    <p>{amount.tax_amount_1}</p>
                    <p>{amount.shipping_tax_amount_1}</p>
                    <p className='m-0'>{amount.shipping_tax_amount_1}</p>
                    </>
                    :
                  <>
                  <p>{amount.tax_amount_1}</p>
                  <p className='m-0'>{amount.shipping_tax_amount_1}</p>
                  </>
                  }
                </th>
                <th>
                  <p>₹ {amount.total_amount_1}</p>
                  <p className='m-0'>₹ {amount.total_Shipping_amount_1}</p>
                </th>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>
                  <p>{input.item_description_2}</p>
                  <p className='m-0'>Shipping Charge</p>
                </td>
                <th>
                  <p>₹ {input.item_price_2}</p>
                  <p className='m-0'>₹ {input.shipping_charge_2}</p>
                </th>
                <th>{input.item_quantity_2}</th>
                <th>
                  <p>₹ {(input.item_price_2*input.item_quantity_2) - (input.discount_2 * 0.01)}</p>
                  <p className='m-0'>₹ {input.shipping_charge_2*input.item_quantity_2}</p>
                </th>
                <th>
                  {taxType?
                  <>
                  <p>9%</p>
                  <p>9%</p>
                  <p>9%</p>
                  <p className='m-0'>9%</p>
                  </>
                  :
                  <>
                  <p>18%</p>
                  <p className='m-0'>18%</p>
                  </>
                  }
                </th>
                <th>
                  {taxType?
                    <>
                    <p>CGST</p>
                    <p>SGST</p>
                    <p>CGST</p>
                    <p className='m-0'>SGST</p>
                    </>
                    :
                  <>
                  <p>IGST</p>
                  <p className='m-0'>IGST</p>
                  </>
                  }
                </th>
                <th>
                {taxType?<>
                  <p>₹ {amount.tax_amount_2}</p>
                  <p>₹ {amount.tax_amount_2}</p>
                  <p>₹ {amount.shipping_tax_amount_2}</p>
                  <p className='m-0'>₹ {amount.shipping_tax_amount_2}</p>
                  </>:
                  <>
                  <p>₹ {amount.tax_amount_2}</p>
                  <p className='m-0'>₹ {amount.shipping_tax_amount_2}</p>
                  </>}
                </th>
                <th>
                  <p>₹ {amount.total_amount_2}</p>
                  <p className='m-0'>₹ {amount.total_Shipping_amount_2}</p>
                </th>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colspan="7" className='text-start'>Total:</th>
                <td>₹ {amount.grand_total_tax}</td>
                <td>₹ {amount.grand_total}</td>
              </tr>
              <tr>
                <th scope="row" colspan="9" className='text-start'>
                  <p className='m-0'>Amount in Words:</p>
                  <p className='m-0'>{converter.toWords(amount.grand_total)}</p>
                </th>
              </tr>
              <tr>
                  <th scope="row" colspan="9" className='text-end'>
                    <p className='m-0'>For {input.seller_fname} {input.seller_mname?input.seller_mname:null} {input.seller_lname}:</p>
                    <img src="/Screenshot 2024-06-27 211231.png" alt="" width='150px' height='30px' />
                    <p className='m-0'>Authorised Signatory</p>
                  </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      : <p className='text-center'>Please fill the form to get Invoice</p> }
    </>
  )
}

export default App
