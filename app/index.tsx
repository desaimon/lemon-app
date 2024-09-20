import { Redirect } from "expo-router"

export default function Index() {
  console.log('splash');
  return <Redirect href={'/splash'}/>   
}

