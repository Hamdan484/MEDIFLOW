import React from "react"
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

function Customers(){

return(

<div className="app-container">

<Sidebar/>

<div className="main">

<Header/>

<h2>Customers</h2>

<table>

<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Phone</th>
<th>Email</th>
</tr>

</thead>

<tbody>

{/* JS: render customers from backend */}

<tr>
<td>1</td>
<td>John Doe</td>
<td>024000000</td>
<td>john@email.com</td>
</tr>

</tbody>

</table>

</div>

</div>

)

}

export default Customers