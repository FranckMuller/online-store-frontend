import Link from 'next/link'

const ThanksPage = () => {
  return <>
  <h3>Thank you for your order</h3>
  <p>
  you can check status of order <Link href='/profile/orders'>here</Link>
  </p>
  </>
}

export default ThanksPage