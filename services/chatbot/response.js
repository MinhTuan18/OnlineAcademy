// const request = require('request');
// const categoryService = require('../../services/category.service')

const { json } = require('body-parser');

const mainMenu = function () {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin chào!",
                        "subtitle": `Bạn muốn biết thông tin gì về các khóa học của Online Academy? (lệnh: "menu")`,
                        "image_url": "https://www.portugaltextil.com/wp-content/uploads/2020/04/Forma%C3%A7%C3%A3o_6abril2020-2.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "TÌM KHÓA HỌC THEO TÊN",
                                "payload": "SEARCH",
                            },
                            {
                                "type": "postback",
                                "title": "DUYỆT THEO DANH MỤC",
                                "payload": "CATEGORIES",
                            }
                        ],
                    }]
            }
        }
    }
}

const search = async function (searchString) {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": []
            }
        }
    }

    const listCourses = await require('./courses.json');

    for (let c of listCourses) {
        response.attachment.payload.elements.push({
            "title": c.title + searchString,
            // "subtitle": c.shortDesc,
            // 'text': `${course.title.toUpperCase()}\n - ${course.shortDesc}\n - long des\n - lv${categoryId}\n - gv\n - Điểm đánh giá: ${course.rating} (${course.numOfRatings})\n - Học phí: ${course.fee}VND ${course.discount != '' ? '(Đang giảm ' + course.discount + '%)' : ''}`
            // "subtitle": `${c.shortDesc}\nlv${categoryId}\ngv\nĐiểm đánh giá: ${c.rating} (${c.numOfRatings})\nHọc phí: ${c.fee}VND ${c.discount != '' ? '(Đang giảm ' + c.discount + '%)' : ''}`,
            "subtitle": `Học phí: ${c.fee}VND ${c.discount != '' ? '(giảm ' + c.discount + '%)' : ''}\n${c.shortDesc}`,
            "image_url": c.coverImage,
            "buttons": [
                {
                    "type": "postback",
                    "title": "XEM CHI TIẾT KHÓA HỌC",
                    "payload": `COURSES_LIST_${c._id.$oid}`
                }
            ],
        })
    }

    return response
}

const searchGuide = async function () {
    return {
        "text": `Mời bạn nhập tên khóa học cần tìm kèm theo trừ khóa "TÌM KHÓA HỌC" ở phía trước.\n(VD: tìm khóa học ios)`
    }
}

const categories = async function () {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": []
            }
        }
    }

    // const listCategories = await categoryService.getCategories();
    const listCategories = await require('./categories.json');

    for (let c of listCategories) {
        response.attachment.payload.elements.push({
            "title": c.name,
            "buttons": [
                {
                    "type": "postback",
                    "title": "XEM DANH SÁCH KHÓA HỌC",
                    "payload": `CATEGORIES_LIST_${c._id.$oid}`
                }
            ],
        })
    }

    return response
}

const coursesByCategory = async function (categoryId) {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": []
            }
        }
    }

    const listCourses = await require('./courses.json');

    for (let c of listCourses) {
        response.attachment.payload.elements.push({
            "title": c.title + categoryId,
            // "subtitle": c.shortDesc,
            // 'text': `${course.title.toUpperCase()}\n - ${course.shortDesc}\n - long des\n - lv${categoryId}\n - gv\n - Điểm đánh giá: ${course.rating} (${course.numOfRatings})\n - Học phí: ${course.fee}VND ${course.discount != '' ? '(Đang giảm ' + course.discount + '%)' : ''}`
            // "subtitle": `${c.shortDesc}\nlv${categoryId}\ngv\nĐiểm đánh giá: ${c.rating} (${c.numOfRatings})\nHọc phí: ${c.fee}VND ${c.discount != '' ? '(Đang giảm ' + c.discount + '%)' : ''}`,
            "subtitle": `Học phí: ${c.fee}VND ${c.discount != '' ? '(giảm ' + c.discount + '%)' : ''}\n${c.shortDesc}`,
            "image_url": c.coverImage,
            "buttons": [
                {
                    "type": "postback",
                    "title": "XEM CHI TIẾT KHÓA HỌC",
                    "payload": `COURSES_LIST_${c._id.$oid}`
                }
            ],
        })
    }

    return response
}

const coursesDetail = async function (courseId) {
    let response = []

    ////////////
    let course = await require('./course.json')



    response.push({
        "attachment": {
            "type": "image",
            "payload": {
                "url": `${course.coverImage}`,
                "is_reusable": false
            }
        }
    })

    // response.push({
    //     'text': `${course.title.toUpperCase()}`
    // })
    // response.push({
    //     'text': `${course.shortDesc}`
    // })
    // response.push({
    //     'text': `long description`
    // })
    // response.push({
    //     'text': `Điểm đánh giá: ${course.rating}/5 (${course.numOfRatings} lượt)`
    // })
    // response.push({
    //     'text': `Học phí: ${course.fee}VND ${course.discount != '' ? '(Đang giảm ' + course.discount + '%)' : ''}`
    // })

    response.push({
        'text': `*${course.title.toUpperCase()} ${courseId}*\n - ${course.shortDesc}\n - long des\n - gv\n - Điểm đánh giá: ${course.rating}/5 (${course.numOfRatings} lượt)\n - Đã đăng kí: ${course.numOfRegistrations} lượt\n - Học phí: ${course.fee}VND ${course.discount != '' ? '(Đang giảm ' + course.discount + '%)' : ''}`
    })

    return response
}

module.exports = {
    mainMenu,
    searchGuide,
    search,
    categories,
    coursesByCategory,
    coursesDetail
}