import {useObj} from "@/Composable/useObj.js";
import {useStr} from "@/Composable/useStr.js";
import _ from "lodash";
import {useStatics} from "@/Composable/useStatics.js";


const {toTitle, toSlug, removeSlug} = useStr()
const {hasKey, length} = useObj()

export function useDataTable() {

    const computeHtmlTemplate = (header, content) => {
        const template = hasKey(header, 'template') ? header.template : null
        if (template && typeof template === 'string') {
            return template.trim().replace(/%value%+/g, content[header.key]).replace(/%key%+/g, header.key).replace(/%label%+/g, header.label)
        }
        return "<span>null</span>"
    }
    const computeLinkTemplate = (header, content) => {
        const template = hasKey(header, 'template') ? header.template : null
        const templateKey = hasKey(header, 'templateKey') ? header.templateKey : header.key
        if (template && typeof template === 'string') {
            return template.trim().replace(/:id+/g, content[templateKey])
        }
        return "#"
    }
    const computeHeaders = (headers, actions = {},enableCheckbox=false) => {
        const newHeaders = [];

        headers.forEach(header => {
            let type = "text";
            let sortable = false;
            let emit = "";
            let label = "";
            let key = "";
            let template = "";
            let templateKey = "";

            if (typeof header !== "object") {
                label = header;
                key = header;
            } else {

                label = header?.label || header.key;
                key = header.key;
                type = header.type || type;
                sortable = header.sortable || sortable;
                template = header.template || null;
                templateKey = ['link'].includes(type) ? header.templateKey || header.key : templateKey
                emit = ['link'].includes(type) ? header.emit || false : emit
            }

            const {columnTypes} = useStatics();
            if (columnTypes.includes(type)){
                newHeaders.push(_.omitBy({
                    label: toTitle(removeSlug(label)),
                    key: toSlug(key, "_"),
                    type,
                    sortable,
                    template,
                    templateKey: toSlug(templateKey, "_"),
                    emit,
                }, value => value === '' || value === null));
            }

        });
        if (enableCheckbox){
            newHeaders.unshift({
                label: toTitle("checkbox"),
                key: "checkbox",
                type: "checkbox",
            })
        }
        if (length(actions) > 0) {
            let newAction = {
                label: toTitle("actions"),
                key: "actions",
                type: "action",
            }
            if (hasKey(actions, 'position') && actions.position === 'leading') {
                newHeaders.unshift(newAction)
            } else {
                newHeaders.push(newAction)
            }
        }


        return newHeaders;
    }
    const slotName = (key, defaultValue = undefined) => {
        if (typeof key !== 'string' || key.trim() === '') {
            return defaultValue;
        }
        const parts = key.split('.');
        return parts[0]
    }
    const getContentByKey = (content, key, defaultValue = undefined) => {
        if (typeof key !== 'string' || key.trim() === '') {
            return defaultValue;
        }

        const parts = key.split('.');
        let newContent = content;

        for (const part of parts) {
            if (!newContent || !hasKey(newContent, part)) {
                return defaultValue;
            }
            newContent = newContent[part];
        }

        return newContent !== undefined ? newContent : defaultValue;
    }
    return {computeHeaders, computeLinkTemplate, computeHtmlTemplate, slotName, getContentByKey}
}

