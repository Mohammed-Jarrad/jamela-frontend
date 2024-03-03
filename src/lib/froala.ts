// Require Editor CSS files for Froala Editor
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/plugins/special_characters.min.css'
import 'froala-editor/css/plugins/table.min.css'
// Froala plugins
import 'froala-editor/js/plugins/char_counter.min.js' // char_counter plugin
import 'froala-editor/js/plugins/colors.min.js' // colors plugin
import 'froala-editor/js/plugins/emoticons.min.js' // emoticons plugin
import 'froala-editor/js/plugins/font_family.min.js' // font-family plugin
import 'froala-editor/js/plugins/font_size.min.js' // font-size plugin
import 'froala-editor/js/plugins/fullscreen.min.js' // fullscreen plugin
import 'froala-editor/js/plugins/help.min.js' // help plugin
import 'froala-editor/js/plugins/line_height.min.js' // line-height plugin
import 'froala-editor/js/plugins/lists.min.js' // lists plugin
import 'froala-editor/js/plugins/paragraph_format.min.js' // paragraph_format plugin
import 'froala-editor/js/plugins/paragraph_style.min.js' // paragraph_style plugin
import 'froala-editor/js/plugins/quote.min.js' // quote plugin
import 'froala-editor/js/plugins/special_characters.min.js' // special_characters plugin
import 'froala-editor/js/plugins/table.min.js' // table plugin

type FroalaConfig = {
    placeholderText?: string
    charCounterMax?: number
}
export const froalaConfig = ({
    placeholderText = 'Describe your product here...',
    charCounterMax = 1000,
}: FroalaConfig = {}) => ({
    placeholderText,
    charCounterCount: true,
    charCounterMax,
    fontSizeSelection: true,
    paragraphStyles: {
        'text-muted-foreground': 'Gray',
        'border py-1 px-2': 'Bordered',
        'fr-text-spaced': 'Spaced',
        'fr-text-uppercase': 'Uppercase',
        'rounded-md': 'Rounded',
    },
})
