import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'

type Props = {
    product: ProductProps
}

const ProductDescription: React.FC<Props> = ({ product }) => {
    return (
        <Box className="my-7">
            <Accordion type="single" collapsible>
                <AccordionItem value="description">
                    <AccordionTrigger>
                        <p className="text-base font-medium">More Info</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FroalaEditorView model={product.description} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

export default ProductDescription
