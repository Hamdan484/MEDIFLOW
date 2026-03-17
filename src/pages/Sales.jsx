import React from "react"
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

function Sales(){

return(

<div className="app-container">

<Sidebar/>

<div className="main">

<Header/>

<h2>Sales</h2>

<button>Create Sale</button>

{/* JS: open sale form */}

<table>

<thead>

<tr>
<th>Sale ID</th>
<th>Medicine</th>
<th>Quantity</th>
<th>Total</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{/* JS: load sales data */}

<tr>
<td>101</td>
<td>Amoxicillin</td>
<td>2</td>
<td>$20</td>
<td>2026</td>
</tr>

</tbody>

</table>

</div>

</div>

)

}

export default Sales