function isOrderMatch (incomingOrder, existingOrder)
{
  if (incomingOrder.price === existingOrder.price &&
    incomingOrder.type !== existingOrder.type)
  {
    return true
  }
  return false
}

function handleOrder (book, incomingOrder, index)
{
  if (incomingOrder.quantity === book[ index ].quantity)
  {
    book.splice(index, 1)

    return book
  } else if (incomingOrder.quantity > book[ index ].quantity)
  {
    incomingOrder.quantity -= book[ index ].quantity
    book.splice(index, 1)

    return reconcileOrder(book, incomingOrder)
  } else
  {
    book[ index ].quantity -= incomingOrder.quantity
    let tempOrder = book.splice(index, 1)
    book.push(tempOrder[0])

    return book
  }
}



function reconcileOrder (book, order)
{
  for (let i = 0; i < book.length; i++)
  {
    if (isOrderMatch(order, book[ i ]))
    {
      return handleOrder(book, order, i)
    }
  }
  book.push(order)

  return book

}

module.exports = reconcileOrder
