export const permission = [
    {
        "PAGEPERMISSION": "ROOT",
        "PARENTID": 0,
        "ISENABLE": 0,
        "PERID": 0
    },
    {
        "PAGEPERMISSION": "Transaction Monitoring",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "RAAST Transactions",
                "PARENTID": 1,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 2,
                        "ISENABLE": 0,
                        "PERID": 144
                    }
                ],
                "ISENABLE": 0,
                "PERID": 2
            },
            {
                "PAGEPERMISSION": "App Transactions",
                "PARENTID": 1,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 3,
                        "ISENABLE": 0,
                        "PERID": 145
                    }
                ],
                "ISENABLE": 0,
                "PERID": 3
            }
        ],
        "ISENABLE": 0,
        "PERID": 1
    },
    {
        "PAGEPERMISSION": "User Management",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Users",
                "PARENTID": 4,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 5,
                        "ISENABLE": 0,
                        "PERID": 6
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 5,
                        "ISENABLE": 0,
                        "PERID": 7
                    },
                    {
                        "PAGEPERMISSION": "Force Logout",
                        "PARENTID": 5,
                        "ISENABLE": 0,
                        "PERID": 8
                    },
                    {
                        "PAGEPERMISSION": "Change Password",
                        "PARENTID": 5,
                        "ISENABLE": 0,
                        "PERID": 9
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 5,
                        "ISENABLE": 0,
                        "PERID": 143
                    }
                ],
                "ISENABLE": 0,
                "PERID": 5
            },
            {
                "PAGEPERMISSION": "Roles",
                "PARENTID": 4,
                "Children": [
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 10,
                        "ISENABLE": 0,
                        "PERID": 11
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 10,
                        "ISENABLE": 0,
                        "PERID": 12
                    }
                ],
                "ISENABLE": 0,
                "PERID": 10
            }
        ],
        "ISENABLE": 0,
        "PERID": 4
    },
    {
        "PAGEPERMISSION": "CRM",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Consumers",
                "PARENTID": 13,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 14,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Demographics",
                                "PARENTID": 15,
                                "ISENABLE": 0,
                                "PERID": 16
                            },
                            {
                                "PAGEPERMISSION": "Consumers Controls ",
                                "PARENTID": 15,
                                "ISENABLE": 0,
                                "PERID": 17
                            },
                            {
                                "PAGEPERMISSION": "Wallets",
                                "PARENTID": 15,
                                "Children": [
                                    {
                                        "PAGEPERMISSION": "View Limits",
                                        "PARENTID": 18,
                                        "Children": [
                                            {
                                                "PAGEPERMISSION": "Load Limits",
                                                "PARENTID": 19,
                                                "ISENABLE": 0,
                                                "PERID": 20
                                            },
                                            {
                                                "PAGEPERMISSION": "Spend Limits",
                                                "PARENTID": 19,
                                                "ISENABLE": 0,
                                                "PERID": 21
                                            }
                                        ],
                                        "ISENABLE": 0,
                                        "PERID": 19
                                    },
                                    {
                                        "PAGEPERMISSION": "View Transactions",
                                        "PARENTID": 18,
                                        "ISENABLE": 0,
                                        "PERID": 22
                                    },
                                    {
                                        "PAGEPERMISSION": "View Wallet Control",
                                        "PARENTID": 18,
                                        "ISENABLE": 0,
                                        "PERID": 23
                                    }
                                ],
                                "ISENABLE": 0,
                                "PERID": 18
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 15
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 14,
                        "ISENABLE": 0,
                        "PERID": 24
                    }
                ],
                "ISENABLE": 0,
                "PERID": 14
            },
            {
                "PAGEPERMISSION": "Merchants",
                "PARENTID": 13,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 25,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Demographics",
                                "PARENTID": 26,
                                "ISENABLE": 0,
                                "PERID": 27
                            },
                            {
                                "PAGEPERMISSION": "Consumer Control ",
                                "PARENTID": 26,
                                "ISENABLE": 0,
                                "PERID": 28
                            },
                            {
                                "PAGEPERMISSION": "Wallets",
                                "PARENTID": 26,
                                "Children": [
                                    {
                                        "PAGEPERMISSION": "View Limits",
                                        "PARENTID": 29,
                                        "Children": [
                                            {
                                                "PAGEPERMISSION": "Load Limits",
                                                "PARENTID": 30,
                                                "ISENABLE": 0,
                                                "PERID": 31
                                            },
                                            {
                                                "PAGEPERMISSION": "Spend Limits",
                                                "PARENTID": 30,
                                                "ISENABLE": 0,
                                                "PERID": 32
                                            }
                                        ],
                                        "ISENABLE": 0,
                                        "PERID": 30
                                    },
                                    {
                                        "PAGEPERMISSION": "View Transactions",
                                        "PARENTID": 29,
                                        "ISENABLE": 0,
                                        "PERID": 33
                                    },
                                    {
                                        "PAGEPERMISSION": "View Wallet Control",
                                        "PARENTID": 29,
                                        "ISENABLE": 0,
                                        "PERID": 34
                                    }
                                ],
                                "ISENABLE": 0,
                                "PERID": 29
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 26
                    }
                ],
                "ISENABLE": 0,
                "PERID": 25
            }
        ],
        "ISENABLE": 0,
        "PERID": 13
    },
    {
        "PAGEPERMISSION": "Product Manager",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Edit",
                "PARENTID": 35,
                "Children": [
                    {
                        "PAGEPERMISSION": "General Configuration",
                        "PARENTID": 36,
                        "ISENABLE": 0,
                        "PERID": 37
                    },
                    {
                        "PAGEPERMISSION": "Load Limits",
                        "PARENTID": 36,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Edit",
                                "PARENTID": 38,
                                "ISENABLE": 0,
                                "PERID": 39
                            },
                            {
                                "PAGEPERMISSION": "Create",
                                "PARENTID": 38,
                                "ISENABLE": 0,
                                "PERID": 147
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 38
                    },
                    {
                        "PAGEPERMISSION": "Spend Limits",
                        "PARENTID": 36,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Edit",
                                "PARENTID": 40,
                                "ISENABLE": 0,
                                "PERID": 41
                            },
                            {
                                "PAGEPERMISSION": "Create",
                                "PARENTID": 40,
                                "ISENABLE": 0,
                                "PERID": 148
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 40
                    },
                    {
                        "PAGEPERMISSION": "KYC Fields Configuration",
                        "PARENTID": 36,
                        "ISENABLE": 0,
                        "PERID": 42
                    },
                    {
                        "PAGEPERMISSION": "Benefits",
                        "PARENTID": 36,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Create",
                                "PARENTID": 43,
                                "ISENABLE": 0,
                                "PERID": 149
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 43
                    },
                    {
                        "PAGEPERMISSION": "Work Flow",
                        "PARENTID": 36,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Delete",
                                "PARENTID": 44,
                                "ISENABLE": 0,
                                "PERID": 45
                            },
                            {
                                "PAGEPERMISSION": "Create",
                                "PARENTID": 44,
                                "Children": [
                                    {
                                        "PAGEPERMISSION": "Save",
                                        "PARENTID": 46,
                                        "ISENABLE": 0,
                                        "PERID": 47
                                    }
                                ],
                                "ISENABLE": 0,
                                "PERID": 46
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 44
                    }
                ],
                "ISENABLE": 0,
                "PERID": 36
            },
            {
                "PAGEPERMISSION": "Create",
                "PARENTID": 35,
                "ISENABLE": 0,
                "PERID": 146
            }
        ],
        "ISENABLE": 0,
        "PERID": 35
    },
    {
        "PAGEPERMISSION": "Taxation",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Tax",
                "PARENTID": 48,
                "Children": [
                    {
                        "PAGEPERMISSION": "View ",
                        "PARENTID": 49,
                        "ISENABLE": 0,
                        "PERID": 50
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 49,
                        "ISENABLE": 0,
                        "PERID": 51
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 49,
                        "ISENABLE": 0,
                        "PERID": 150
                    }
                ],
                "ISENABLE": 0,
                "PERID": 49
            }
        ],
        "ISENABLE": 0,
        "PERID": 48
    },
    {
        "PAGEPERMISSION": "Fee and Charges",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Transaction Fee",
                "PARENTID": 52,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 53,
                        "ISENABLE": 0,
                        "PERID": 54
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 53,
                        "ISENABLE": 0,
                        "PERID": 55
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 53,
                        "ISENABLE": 0,
                        "PERID": 151
                    }
                ],
                "ISENABLE": 0,
                "PERID": 53
            }
        ],
        "ISENABLE": 0,
        "PERID": 52
    },
    {
        "PAGEPERMISSION": "Network Configuration",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Channel",
                "PARENTID": 56,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 57,
                        "ISENABLE": 0,
                        "PERID": 58
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 57,
                        "ISENABLE": 0,
                        "PERID": 59
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 57,
                        "ISENABLE": 0,
                        "PERID": 152
                    }
                ],
                "ISENABLE": 0,
                "PERID": 57
            },
            {
                "PAGEPERMISSION": "Server",
                "PARENTID": 56,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 60,
                        "ISENABLE": 0,
                        "PERID": 61
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 60,
                        "ISENABLE": 0,
                        "PERID": 62
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 60,
                        "ISENABLE": 0,
                        "PERID": 153
                    }
                ],
                "ISENABLE": 0,
                "PERID": 60
            }
        ],
        "ISENABLE": 0,
        "PERID": 56
    },
    {
        "PAGEPERMISSION": "System Settings",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Notification",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "Transaction Notification",
                        "PARENTID": 64,
                        "Children": [
                            {
                                "PAGEPERMISSION": "View",
                                "PARENTID": 65,
                                "ISENABLE": 0,
                                "PERID": 66
                            },
                            {
                                "PAGEPERMISSION": "Edit",
                                "PARENTID": 65,
                                "ISENABLE": 0,
                                "PERID": 67
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 65
                    },
                    {
                        "PAGEPERMISSION": "Broadcast Notfication",
                        "PARENTID": 64,
                        "Children": [
                            {
                                "PAGEPERMISSION": "View",
                                "PARENTID": 68,
                                "ISENABLE": 0,
                                "PERID": 69
                            },
                            {
                                "PAGEPERMISSION": "Edit",
                                "PARENTID": 68,
                                "ISENABLE": 0,
                                "PERID": 70
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 68
                    }
                ],
                "ISENABLE": 0,
                "PERID": 64
            },
            {
                "PAGEPERMISSION": "System Parameters",
                "PARENTID": 63,
                "ISENABLE": 0,
                "PERID": 71
            },
            {
                "PAGEPERMISSION": "City",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 72,
                        "ISENABLE": 0,
                        "PERID": 73
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 72,
                        "ISENABLE": 0,
                        "PERID": 74
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 72,
                        "ISENABLE": 0,
                        "PERID": 154
                    }
                ],
                "ISENABLE": 0,
                "PERID": 72
            },
            {
                "PAGEPERMISSION": "State",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 75,
                        "ISENABLE": 0,
                        "PERID": 76
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 75,
                        "ISENABLE": 0,
                        "PERID": 77
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 75,
                        "ISENABLE": 0,
                        "PERID": 155
                    }
                ],
                "ISENABLE": 0,
                "PERID": 75
            },
            {
                "PAGEPERMISSION": "Country",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 78,
                        "ISENABLE": 0,
                        "PERID": 79
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 78,
                        "ISENABLE": 0,
                        "PERID": 80
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 78,
                        "ISENABLE": 0,
                        "PERID": 156
                    }
                ],
                "ISENABLE": 0,
                "PERID": 78
            },
            {
                "PAGEPERMISSION": "Currency",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 81,
                        "ISENABLE": 0,
                        "PERID": 82
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 81,
                        "ISENABLE": 0,
                        "PERID": 157
                    }
                ],
                "ISENABLE": 0,
                "PERID": 81
            },
            {
                "PAGEPERMISSION": "Forex",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 83,
                        "ISENABLE": 0,
                        "PERID": 84
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 83,
                        "ISENABLE": 0,
                        "PERID": 158
                    }
                ],
                "ISENABLE": 0,
                "PERID": 83
            },
            {
                "PAGEPERMISSION": "Transaction",
                "PARENTID": 63,
                "Children": [
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 85,
                        "ISENABLE": 0,
                        "PERID": 86
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 85,
                        "ISENABLE": 0,
                        "PERID": 159
                    }
                ],
                "ISENABLE": 0,
                "PERID": 85
            }
        ],
        "ISENABLE": 0,
        "PERID": 63
    },
    {
        "PAGEPERMISSION": "Wallets",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Merchant Wallets",
                "PARENTID": 87,
                "ISENABLE": 0,
                "PERID": 88
            },
            {
                "PAGEPERMISSION": "Merchant Wallets Balance Trail",
                "PARENTID": 87,
                "ISENABLE": 0,
                "PERID": 89
            },
            {
                "PAGEPERMISSION": "Consumer Wallets",
                "PARENTID": 87,
                "ISENABLE": 0,
                "PERID": 90
            },
            {
                "PAGEPERMISSION": "Consumer Wallets Balance Trail",
                "PARENTID": 87,
                "ISENABLE": 0,
                "PERID": 91
            },
            {
                "PAGEPERMISSION": "External Party Wallets",
                "PARENTID": 87,
                "ISENABLE": 0,
                "PERID": 92
            },
            {
                "PAGEPERMISSION": "External Party Wallets Balance Trail ",
                "PARENTID": 87,
                "ISENABLE": 0,
                "PERID": 93
            }
        ],
        "ISENABLE": 0,
        "PERID": 87
    },
    {
        "PAGEPERMISSION": "Accounting",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "General Ledger",
                "PARENTID": 94,
                "ISENABLE": 0,
                "PERID": 95
            },
            {
                "PAGEPERMISSION": "Refund Initiator",
                "PARENTID": 94,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 96,
                        "ISENABLE": 0,
                        "PERID": 97
                    },
                    {
                        "PAGEPERMISSION": "Initiate Refund",
                        "PARENTID": 96,
                        "ISENABLE": 0,
                        "PERID": 98
                    }
                ],
                "ISENABLE": 0,
                "PERID": 96
            },
            {
                "PAGEPERMISSION": "Refund Authorizer",
                "PARENTID": 94,
                "Children": [
                    {
                        "PAGEPERMISSION": "Authorize",
                        "PARENTID": 99,
                        "ISENABLE": 0,
                        "PERID": 100
                    }
                ],
                "ISENABLE": 0,
                "PERID": 99
            }
        ],
        "ISENABLE": 0,
        "PERID": 94
    },
    {
        "PAGEPERMISSION": "Finance",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Pool Account",
                "PARENTID": 101,
                "ISENABLE": 0,
                "PERID": 102
            },
            {
                "PAGEPERMISSION": "Pool Account Log",
                "PARENTID": 101,
                "ISENABLE": 1,
                "PERID": 169
            }
        ],
        "ISENABLE": 0,
        "PERID": 101
    },
    {
        "PAGEPERMISSION": "Merchant Management",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Institution",
                "PARENTID": 103,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 104,
                        "ISENABLE": 0,
                        "PERID": 105
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 104,
                        "ISENABLE": 0,
                        "PERID": 106
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 104,
                        "ISENABLE": 0,
                        "PERID": 160
                    }
                ],
                "ISENABLE": 0,
                "PERID": 104
            },
            {
                "PAGEPERMISSION": "Merchant",
                "PARENTID": 103,
                "Children": [
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 107,
                        "ISENABLE": 0,
                        "PERID": 108
                    },
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 107,
                        "Children": [
                            {
                                "PAGEPERMISSION": "General Info",
                                "PARENTID": 109,
                                "ISENABLE": 0,
                                "PERID": 110
                            },
                            {
                                "PAGEPERMISSION": "Business Member",
                                "PARENTID": 109,
                                "Children": [
                                    {
                                        "PAGEPERMISSION": "View",
                                        "PARENTID": 111,
                                        "ISENABLE": 0,
                                        "PERID": 112
                                    },
                                    {
                                        "PAGEPERMISSION": "Edit",
                                        "PARENTID": 111,
                                        "ISENABLE": 0,
                                        "PERID": 113
                                    },
                                    {
                                        "PAGEPERMISSION": "Create",
                                        "PARENTID": 111,
                                        "ISENABLE": 0,
                                        "PERID": 162
                                    }
                                ],
                                "ISENABLE": 0,
                                "PERID": 111
                            },
                            {
                                "PAGEPERMISSION": "Financial Details ",
                                "PARENTID": 109,
                                "Children": [
                                    {
                                        "PAGEPERMISSION": "View",
                                        "PARENTID": 114,
                                        "ISENABLE": 0,
                                        "PERID": 115
                                    },
                                    {
                                        "PAGEPERMISSION": "Edit",
                                        "PARENTID": 114,
                                        "ISENABLE": 0,
                                        "PERID": 116
                                    },
                                    {
                                        "PAGEPERMISSION": "Create",
                                        "PARENTID": 114,
                                        "ISENABLE": 0,
                                        "PERID": 163
                                    }
                                ],
                                "ISENABLE": 0,
                                "PERID": 114
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 109
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 107,
                        "ISENABLE": 0,
                        "PERID": 161
                    }
                ],
                "ISENABLE": 0,
                "PERID": 107
            },
            {
                "PAGEPERMISSION": "Terminal",
                "PARENTID": 103,
                "Children": [
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 117,
                        "ISENABLE": 0,
                        "PERID": 118
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 117,
                        "ISENABLE": 0,
                        "PERID": 119
                    },
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 117,
                        "ISENABLE": 0,
                        "PERID": 168
                    }
                ],
                "ISENABLE": 0,
                "PERID": 117
            },
            {
                "PAGEPERMISSION": "Merchant Branch",
                "PARENTID": 103,
                "Children": [
                    {
                        "PAGEPERMISSION": "Create",
                        "PARENTID": 164,
                        "ISENABLE": 0,
                        "PERID": 165
                    },
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 164,
                        "ISENABLE": 0,
                        "PERID": 166
                    },
                    {
                        "PAGEPERMISSION": "View",
                        "PARENTID": 164,
                        "ISENABLE": 0,
                        "PERID": 167
                    }
                ],
                "ISENABLE": 0,
                "PERID": 164
            }
        ],
        "ISENABLE": 0,
        "PERID": 103
    },
    {
        "PAGEPERMISSION": "Digital Identity",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Merchant",
                "PARENTID": 120,
                "Children": [
                    {
                        "PAGEPERMISSION": "Scrutiny",
                        "PARENTID": 121,
                        "ISENABLE": 0,
                        "PERID": 122
                    },
                    {
                        "PAGEPERMISSION": "Maker",
                        "PARENTID": 121,
                        "ISENABLE": 0,
                        "PERID": 123
                    },
                    {
                        "PAGEPERMISSION": "Checker",
                        "PARENTID": 121,
                        "ISENABLE": 0,
                        "PERID": 124
                    }
                ],
                "ISENABLE": 0,
                "PERID": 121
            },
            {
                "PAGEPERMISSION": "Consumer",
                "PARENTID": 120,
                "Children": [
                    {
                        "PAGEPERMISSION": "Scrutiny",
                        "PARENTID": 125,
                        "ISENABLE": 0,
                        "PERID": 126
                    },
                    {
                        "PAGEPERMISSION": "Maker",
                        "PARENTID": 125,
                        "ISENABLE": 0,
                        "PERID": 127
                    },
                    {
                        "PAGEPERMISSION": "Checker",
                        "PARENTID": 125,
                        "ISENABLE": 0,
                        "PERID": 128
                    }
                ],
                "ISENABLE": 0,
                "PERID": 125
            }
        ],
        "ISENABLE": 0,
        "PERID": 120
    },
    {
        "PAGEPERMISSION": "Merchant Maintenance",
        "PARENTID": 0,
        "Children": [
            {
                "PAGEPERMISSION": "Maintenance Maker",
                "PARENTID": 129,
                "Children": [
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 130,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Change of DBA",
                                "PARENTID": 131,
                                "ISENABLE": 0,
                                "PERID": 132
                            },
                            {
                                "PAGEPERMISSION": "Change of Address",
                                "PARENTID": 131,
                                "ISENABLE": 0,
                                "PERID": 133
                            },
                            {
                                "PAGEPERMISSION": "Change of MDR",
                                "PARENTID": 131,
                                "ISENABLE": 0,
                                "PERID": 134
                            },
                            {
                                "PAGEPERMISSION": "TIP Adjustment",
                                "PARENTID": 131,
                                "ISENABLE": 0,
                                "PERID": 135
                            },
                            {
                                "PAGEPERMISSION": "Services",
                                "PARENTID": 131,
                                "ISENABLE": 0,
                                "PERID": 136
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 131
                    }
                ],
                "ISENABLE": 0,
                "PERID": 130
            },
            {
                "PAGEPERMISSION": "Maintenance Checker",
                "PARENTID": 129,
                "Children": [
                    {
                        "PAGEPERMISSION": "Edit",
                        "PARENTID": 137,
                        "Children": [
                            {
                                "PAGEPERMISSION": "Change of DBA",
                                "PARENTID": 138,
                                "ISENABLE": 0,
                                "PERID": 139
                            },
                            {
                                "PAGEPERMISSION": "Change of Address",
                                "PARENTID": 138,
                                "ISENABLE": 0,
                                "PERID": 140
                            },
                            {
                                "PAGEPERMISSION": "Change of MDR",
                                "PARENTID": 138,
                                "ISENABLE": 0,
                                "PERID": 141
                            },
                            {
                                "PAGEPERMISSION": "TIP Adjustment",
                                "PARENTID": 138,
                                "ISENABLE": 0,
                                "PERID": 142
                            }
                        ],
                        "ISENABLE": 0,
                        "PERID": 138
                    }
                ],
                "ISENABLE": 0,
                "PERID": 137
            }
        ],
        "ISENABLE": 0,
        "PERID": 129
    }
]