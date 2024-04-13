import Dialog from "@/components/my/my-dialog"
import React from "react"

 

const Test = () => {
    const [show, setShow] = React.useState(false)
    
    return (
        <div className="p-2">
            <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
            <Dialog open={show} onOpenChange={setShow}>
                helllllllllo
            </Dialog>
        </div>
    )
}

export default Test
