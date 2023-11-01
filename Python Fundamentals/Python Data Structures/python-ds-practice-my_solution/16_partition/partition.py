# first fn
def is_even(num):
    return num % 2 == 0


# second fn
def is_string(el):
    return isinstance(el, str)


def partition(lst, fn):
    """Partition lst by predicate.

    - lst: list of items
    - fn: function that returns True or False

    Returns new list: [a, b], where `a` are items that passed fn test,
    and `b` are items that failed fn test.

       >>> def is_even(num):
       ...     return num % 2 == 0

       >>> def is_string(el):
       ...     return isinstance(el, str)

       >>> partition([1, 2, 3, 4], is_even)
       [[2, 4], [1, 3]]

       >>> partition(["hi", None, 6, "bye"], is_string)
       [['hi', 'bye'], [None, 6]]
    """

    a = []
    b = []

    for num in lst:
        if fn(num):
            a.append(num)
        else:
            b.append(num)

    return [a, b]

    # Clever, but less optimal solution --- this runs fn() twice on each element,
    # not once:
    #
    # return [
    #     [val for val in lst if fn(val)],
    #     [val for val in lst if not fn(val)]
    # ]
