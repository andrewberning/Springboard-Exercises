def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d.

        >>> min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'})
        (1, 10)

    Works with any kind of key that can be compared, like strings:

        >>> min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"})
        ('apple', 'cherry')
    """

    keys = d.keys()

    return (min(keys), max(keys))

    # OR...

    # min_keys = None
    # max_keys = None

    # for key in d:
    #     if min_keys is None or key < min_keys:
    #         min_keys = key
    #     if max_keys is None or key > max_keys:
    #         max_keys = key

    # return (min_keys, max_keys)
