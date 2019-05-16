const HIDDEN_CLASS_NAME = 'hidden'
const TARGET_CLASS_NAME = 'target'
const SOURCE_CLASS_NAME = 'source'
$(function() {
    const sourcesObj = $(`.${SOURCE_CLASS_NAME}`);
    const targetsObj = $(`.${TARGET_CLASS_NAME}`);
    for (let source of sourcesObj) {
        $(source).click(function (e) {
            e.preventDefault();
            showTarget(source, targetsObj);
        });
    }
    function showTarget(source, targetsObj) {
        const targetStr = $(source).attr('for');
        for (let target of targetsObj) {
            const jqTarget = $(target);
            if (jqTarget.hasClass(targetStr) && jqTarget.hasClass(HIDDEN_CLASS_NAME)) {
                jqTarget.removeClass(HIDDEN_CLASS_NAME)
            } else if (!jqTarget.hasClass(HIDDEN_CLASS_NAME) && !jqTarget.hasClass(targetStr)) {
                jqTarget.addClass(HIDDEN_CLASS_NAME)
            }
        }
    }
})
