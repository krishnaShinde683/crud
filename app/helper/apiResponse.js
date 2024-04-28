exports.successResponse = (res, msg) => {
    let data = {
        status: true,
        message: msg
    }
    return res.status(200).json(data)
}

exports.successResponseWithData = (res, msg, resdata) => {
    let data = {
        status: true,
        message: msg,
        data: resdata
    }
    return res.status(200).json(data)
}
exports.errorResponse = (res, msg) => {
    let data = {
        status: false,
        message: msg
    }
    return res.status(500).json(data)
}
exports.notFoundResponse = (res, msg) => {
    let data = {
        status: false,
        message: msg
    }
    return res.status(404).json(data)
}

exports.badRequest = (res, msg) => {
    let data = {
        status: false,
        message: msg
    }
    return res.status(400).json(data)
}

exports.unauthorizedResponse = (res, msg) => {
    let data = {
        status: false,
        message: msg
    }
    return res.status(401).json(data)
}
exports.forbiddenAccess = (res, msg, data1) => {
    let data = {
        status: false,
        message: msg
    }
    if (data1) {
        data.data = data1
    }
    return res.status(403).json(data)
}
