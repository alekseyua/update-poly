
export const getCookie = (name) => {
    try {
        let nameEQ = name + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    } catch (e) {
        return null;
    }
}

export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    // document.cookie = name + '=' + (value || '') + expires + '; path=/; flavor=choco; SameSite=Lax; Secure'
    document.cookie = name + '=' + (value || '') + expires + '; path=/;'

}

export const removeCookie = (name) => {
    const CookiesDelete = (name) => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const names = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = names + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = names + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
    CookiesDelete(name)
}

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    return true;
};

export const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
    return true;
};

export const checkLocalStorage = (key) => {

    for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.key(index) === key) {
            return true;
        }
    }
    return false;
};

export const isTargetBlank = (isBlank) => {
    return isBlank ? '_blank' : '';
}

export const initialsName = (first_name, last_name) => {
    return `${first_name[0]}${last_name[last_name.length - 1]}`;
}

export const unicArr = (arr) => {
    const result = [];
    const duplicatesIndices = [];

    arr.forEach((current, index) => {
        if (duplicatesIndices.includes(index)) return;

        result.push(current);

        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);

            if (currentKeys.length !== comparisonKeys.length) continue;

            const currentKeysString = currentKeys.sort().join('').toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join('').toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;

            // Проверяем индексы ключей
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if (current[key] !== comparison[key]) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);
        }
    });
    return result;
}

export const debounce = (functionContext, wait, immediate) => {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) functionContext.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) functionContext.apply(context, args);
    };
};

export const rotateMatrix = (matrix) => {
    var result = [],
        y,
        h,
        x,
        w;
    for (y = 0, h = matrix.length; y < h; y++) {
        for (x = 0, w = matrix[y].length; x < w; x++) {
            if (!result[x]) result[x] = [];
            result[x][y] = matrix[y][x];
        }
    }
    return result;
};

export const getCoordinat = (testBlock) => {
    const getCoords = (elem) => { // кроме IE8-
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }

    let counter = 0;
    document.addEventListener("DOMContentLoaded", (e) => {
        console.log('Страница загружена');
        e.target.addEventListener("scroll", () => {
            counter++;
            console.log('Страница прокручена ' + counter + ' раз');
            console.log('Top: ' + getCoords(testBlock).top);
            console.log('Left: ' + getCoords(testBlock).left);
        }, false);
    }, false);
}

export const getActiveColor = (color) => {
    return !Array.isArray(color)? color : color.filter(el=> el.selected)[0].id
} 

export const getActiveSize = (size) => {
    return !Array.isArray(size)? size : size.filter(el=> el.selected)[0].id
} 