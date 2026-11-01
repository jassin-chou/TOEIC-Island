# Part 6 段落填空 — 每篇 4 題，含 1 題插入句
# h: 文章（空格寫成 [[1]] [[2]]...，段落用空行分隔）
# qs: (tag, blank_no, [correct, d1, d2, d3], explanation)
S = [
dict(t='E-mail：訂單延遲', h="""To: Brian Holt <bholt@marlowdesign.com>
From: Customer Service <service@papercraft.com>
Subject: Your order #4471

Dear Mr. Holt,

Thank you for your recent order of business cards and letterhead. Unfortunately, the special cream-colored paper you selected is temporarily [[1]]. Our supplier expects to send us a new shipment by May 10.

We can either wait for the new paper to arrive or print your order on a similar white paper right away. [[2]], we will ship it within two business days. [[3]]

Please let us know your preference by replying to this e-mail. We apologize for the inconvenience and [[4]] your understanding.

Sincerely,
Nadia Brooks
PaperCraft Printing""",
 qs=[
 ("單字語意", 1, ["unavailable", "unlimited", "unclear", "unaffordable"], "供應商 5/10 才會送新貨 → 紙張暫時缺貨 unavailable。"),
 ("連接副詞", 2, ["If you choose the second option", "Despite this", "As a result of the delay", "In contrast"], "前一句給了兩個選項，這句說「兩天內出貨」只適用於第二個選項（馬上用白紙印），所以用 If you choose the second option。"),
 ("插入句", 3, ["Either way, there will be no additional charge.", "Our new office is located on Pine Street.", "Business cards are our most popular product.", "Thank you for applying for the position."], "插入句要呼應上下文：講完兩種選擇，接「不論哪一種都不會加價」最通順。"),
 ("動詞時態", 4, ["appreciate", "appreciated", "will have appreciated", "appreciating"], "and 連接兩個現在式動詞：We apologize ... and appreciate your understanding。"),
 ]),
dict(t='公告：電梯維修', h="""NOTICE TO ALL TENANTS

The elevators in the east wing of Carlton Tower will be [[1]] maintenance from Monday, June 3, to Wednesday, June 5. During this time, tenants and visitors should use the elevators in the west wing.

[[2]] Deliveries to offices in the east wing should be made through the loading dock on Baker Street. Building staff will be available to help move large items.

We understand that this may cause some [[3]]. [[4]] questions about the maintenance schedule should be directed to the building management office at extension 200.

Thank you for your cooperation.""",
 qs=[
 ("單字語意", 1, ["undergoing", "underneath", "under way", "understood"], "be undergoing maintenance（進行維修）。underneath 是「在下方」，under way 後面不能直接接名詞。"),
 ("插入句", 2, ["The freight elevator will also be out of service.", "The building was completed in 1998.", "Rent payments are due on the first of the month.", "Visitors must show a photo ID at the entrance."], "下一句說貨物要改從卸貨區送，前面先說明貨梯也停用最合理。"),
 ("詞性", 3, ["inconvenience", "inconvenient", "inconveniently", "inconvenienced"], "some + 名詞：some inconvenience。"),
 ("數量詞", 4, ["Any", "Every", "Each", "Much"], "questions 是複數名詞，用 Any；Every/Each 後接單數，Much 接不可數。"),
 ]),
dict(t='信件：錄取通知', h="""Dear Ms. Alvarez,

On behalf of Brightline Software, I am pleased to offer you the position of Junior Data Analyst. We were very impressed by your [[1]] during the interview process.

As discussed, your starting salary will be $52,000 per year, and you will be eligible for health benefits after a 90-day probationary period. Your first day of work [[2]] Monday, August 12.

[[3]] Please sign the enclosed contract and return it to me by July 31. If you have any questions, do not hesitate to contact me.

We look forward to [[4]] you to our team.

Best regards,
Daniel Kim
Human Resources Manager""",
 qs=[
 ("單字語意", 1, ["performance", "permission", "prevention", "persistence"], "對面試中的「表現」印象深刻：performance。"),
 ("動詞時態", 2, ["will be", "was", "has been", "had been"], "到職日在未來，用 will be。"),
 ("插入句", 3, ["To accept this offer, a few steps are required.", "Our company was founded in 2005.", "Unfortunately, the position has been filled.", "Interviews will be held next week."], "後面接著說明要簽合約寄回，前面用「接受此錄取需要幾個步驟」引出最自然。"),
 ("動名詞", 4, ["welcoming", "welcome", "welcomed", "be welcomed"], "look forward to + V-ing：look forward to welcoming you。"),
 ]),
dict(t='文章：社區新聞', h="""GREENVILLE — The Greenville Public Library will open a new branch on Elm Street next month. The two-story building will feature a children's reading room, a computer lab, and a community meeting space that can be [[1]] free of charge by local groups.

The project was funded [[2]] by a donation from the Harper Family Foundation. "We wanted to give something back to the town where our business started," said Ellen Harper.

[[3]] Library director Tom Grady says the branch will also offer weekend language classes. "Many residents have asked for these classes, and we're excited to [[4]] them," he said.

The opening ceremony will take place on Saturday, September 7, at 10 A.M.""",
 qs=[
 ("主被動", 1, ["reserved", "reserving", "reserve", "reservation"], "can be + p.p. 被動：會議空間「可被預約」reserved。"),
 ("副詞", 2, ["largely", "large", "larger", "largeness"], "修飾 was funded 用副詞 largely（大部分）。"),
 ("插入句", 3, ["In addition to books, the branch will offer many programs.", "The library closes at 6 P.M. on weekdays.", "Ms. Harper has lived in Greenville since 1990.", "Construction costs have risen sharply this year."], "下一句說還會開語言課（also），前面先說「除了書以外還有很多活動」銜接最好。"),
 ("單字語意", 4, ["provide", "prevent", "pretend", "predict"], "很高興能「提供」這些課程：provide。"),
 ]),
dict(t='備忘錄：新休假系統', h="""MEMO
To: All Staff
From: Rachel Moore, Human Resources
Re: New leave request system

Starting October 1, all vacation and sick leave requests must be submitted through the new online system, LeaveTrack. Paper forms will no longer be [[1]].

LeaveTrack allows you to check your remaining leave days at any time. Managers will receive an automatic notification when you submit a request, [[2]] should speed up the approval process.

A training session will be held on September 25 in Conference Room B. [[3]] If you cannot attend, a recorded version will be available on the intranet.

Please contact me if you have [[4]] trouble logging in.""",
 qs=[
 ("單字語意", 1, ["accepted", "accessed", "excepted", "expected"], "紙本表格不再「被接受」accepted。excepted（被排除）是相似字陷阱。"),
 ("關係詞", 2, ["which", "what", "who", "it"], "非限定關係子句，which 指前面整件事（主管會收到通知這件事）。it 會造成兩個子句沒有連接詞。"),
 ("插入句", 3, ["All employees are strongly encouraged to attend.", "The cafeteria will be closed that day.", "Vacation days cannot be carried over.", "Room B was recently renovated."], "講完訓練時間，接著說「強烈鼓勵全員參加」，下一句「若無法參加……」才連得上。"),
 ("數量詞", 4, ["any", "many", "few", "each"], "if you have any trouble：any 用在條件句中；trouble 不可數，不用 many/few。"),
 ]),
dict(t='廣告：家電特賣', h="""SUMMER SALE AT HOMEWAY APPLIANCES!

For one week only, July 15–21, enjoy discounts of up to 40 percent on refrigerators, washing machines, and air conditioners. [[1]] customers who spend more than $1,000 will receive free delivery and installation.

Our knowledgeable sales staff will help you choose the [[2]] model for your home and budget. [[3]]

Not sure what you need? Visit our Web site to compare products and read customer reviews before you [[4]] our store.

HomeWay Appliances — 225 Market Street — Open daily 9 A.M. to 8 P.M.""",
 qs=[
 ("轉折語", 1, ["In addition,", "However,", "Otherwise,", "Instead,"], "折扣之外再加碼免運，表示「此外」In addition。"),
 ("比較級", 2, ["best", "better", "good", "well"], "the + 最高級 best：最適合的型號。"),
 ("插入句", 3, ["We also offer flexible payment plans.", "Our store first opened in 1985.", "Refrigerators use a lot of electricity.", "The sale ended last week."], "上文講店員協助挑選，接著補充付款方案是自然的廣告延伸；The sale ended last week 與特賣時間矛盾。"),
 ("動詞時態", 4, ["visit", "will visit", "visited", "visiting"], "before 引導的時間子句用現在式表未來：before you visit。"),
 ]),
dict(t='E-mail：會議改期', h="""To: Project Team
From: Kenji Watanabe
Subject: Change of meeting date

Hi everyone,

I'm writing to let you know that our project review meeting, originally scheduled for Thursday, has been moved to Friday at 10 A.M. The client has asked to [[1]] the meeting by video conference, and the IT department needs time to set up the equipment.

[[2]] Please bring your updated progress reports. I would like each team leader to give a short [[3]] of what has been completed so far.

If Friday morning does not work for you, let me know by Wednesday [[4]] I can make other arrangements.

Thanks,
Kenji""",
 qs=[
 ("單字語意", 1, ["join", "joint", "joining", "joiner"], "to 後接原形動詞：asked to join（要求以視訊參加）。"),
 ("插入句", 2, ["The meeting will still take place in Room 5A.", "The client is based in Toronto.", "The IT department hired two new staff.", "Thursday is a national holiday."], "改期之後補充「地點不變」，再接要帶的資料，邏輯順暢。"),
 ("名詞", 3, ["summary", "summarize", "summarized", "summarily"], "a short + 名詞：a short summary（簡短摘要）。"),
 ("連接詞", 4, ["so that", "even if", "whereas", "unless"], "目的：讓我能另作安排，so that。"),
 ]),
dict(t='網頁：退貨政策', h="""RETURN POLICY — Outdoor Gear Co.

We want you to be completely satisfied with your purchase. If you are not happy with an item, you may return it within 30 days of delivery for a full refund. Items must be unused and [[1]] in their original packaging.

To start a return, log in to your account and select "Return an Item." [[2]] Simply print it and attach it to the package.

Refunds are usually processed within five business days after we receive the item. Please note that shipping fees are non-refundable [[3]] the item was damaged or defective.

For [[4]] information, please contact our customer care team.""",
 qs=[
 ("主被動", 1, ["returned", "returning", "return", "to return"], "Items must be unused and (must be) returned：與 unused 並列的過去分詞 returned。"),
 ("插入句", 2, ["A prepaid shipping label will be e-mailed to you.", "Our stores are open seven days a week.", "Most items are made from recycled materials.", "Gift cards cannot be returned."], "下一句 Simply print it 的 it 必須指一個可列印的東西 → shipping label。代名詞線索是插入句題的關鍵。"),
 ("連接詞", 3, ["unless", "because", "so", "while"], "運費不退，「除非」商品損壞：unless。"),
 ("形容詞", 4, ["further", "farther", "furthest", "far"], "for further information（如需更多資訊）是固定用語；farther 用在實際距離。"),
 ]),
]
