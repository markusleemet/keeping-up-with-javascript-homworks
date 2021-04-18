const valueAndLabelMatch = (value, label) => {
    if (label.endsWith('s') && value === 1 || !label.endsWith('s') && value !== 1) {
        return false;
    }
    return true;
};

const typesAreCorrect = (value, label) => {
    if (typeof value === 'number' && value > 0 && typeof label === 'string') {
        return true;
    }
    return false;
};

const getSeconds = (value, label) => {
    if (typesAreCorrect(value, label) && valueAndLabelMatch(value, label)) {
        switch (label) {
            case 'seconds':
            case 'second':
                return value;
            case 'minutes':
            case 'minute':
                return 60 * value;
            case 'hours':
            case 'hour':
                return 3600 * value;
            case 'days':
            case 'day':
                return 86400 * value;
            default:
                return false;
        }
    } else {
        return false;
    }
};

const getHighestLabel = (valueInSeconds) => {
    let finalValue;
    let finalLabel;
    switch (true){
        case (valueInSeconds % 86400 === 0):
            finalValue = valueInSeconds / 86400;
            finalLabel = finalValue >= 2 ? 'days' : 'day';
            break;
        case (valueInSeconds % 3600 === 0):
            finalValue = valueInSeconds / 3600;
            finalLabel = finalValue >= 2 ? 'hours' : 'hour';
            break;
        case (valueInSeconds % 60 === 0):
            finalValue = valueInSeconds / 60;
            finalLabel = finalValue >= 2 ? 'minutes' : 'minute';
            break;
        default:
            finalValue = valueInSeconds;
            finalLabel = finalValue >= 2 ? 'seconds' : 'second';
            break;
    }
    return [finalValue, finalLabel];
};


const timeAdder = (value1, label1, value2, label2) => {
    const value1inSeconds = getSeconds(value1, label1);
    const value2inSeconds = getSeconds(value2, label2);

    // If either value and label pair was invalid return false
    if (value1inSeconds && value2inSeconds) {
        return getHighestLabel(value1inSeconds + value2inSeconds);
    } else {
        // Invalid input -> return false
        return false;
    }
};

console.log(timeAdder(20, 'hours', 5, 'hours'));


