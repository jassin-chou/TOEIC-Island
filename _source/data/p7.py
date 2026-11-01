# Part 7 閱讀測驗 — 單篇 / 雙篇 / 三篇
# docs: [(文件標題, 內容)]；qs: (tag, question, [correct, d1, d2, d3], explanation)
# 插入句題的選項是 [1]~[4]，不會被打亂。
S = [
# ================= Single passages =================
dict(t='單篇：公告', kind='single', docs=[('Notice', """ATTENTION ALL RESIDENTS — Maple Court Apartments

The water supply to Buildings A and B will be shut off on Tuesday, April 9, from 9:00 A.M. to 3:00 P.M. so that workers can replace old pipes in the basement. Residents of Building C will not be affected.

We recommend that you store enough water for drinking and cooking before 9:00 A.M. Bottled water will be available free of charge in the lobby of Building A.

We apologize for any inconvenience. If you have questions, please call the management office at 555-0142.""")],
 qs=[
 ("主旨", "What is the purpose of the notice?", ["To inform residents of a temporary service interruption", "To announce a rent increase", "To invite residents to a meeting", "To introduce a new building manager"], "停水通知：暫時中斷服務。"),
 ("細節", "Who will NOT be affected by the work?", ["Residents of Building C", "Residents of Building A", "Residents of Building B", "Management office staff"], "Residents of Building C will not be affected。NOT 題要特別看清楚。"),
 ("細節", "What will be provided in the lobby?", ["Water", "Food", "Repair tools", "Information packets"], "Bottled water will be available free of charge in the lobby。"),
 ]),
dict(t='單篇：簡訊對話', kind='single', docs=[('Text message chain', """Laura Chen [10:02 A.M.]
Hi Mark, are you still at the warehouse? The client just called. They want 50 more units of the desk lamp added to Friday's shipment.

Mark Davies [10:05 A.M.]
I'm here. Let me check our stock.

Mark Davies [10:11 A.M.]
We only have 30 left. The next delivery from the factory arrives Monday.

Laura Chen [10:12 A.M.]
Hmm. Could we send 30 on Friday and the rest next week?

Mark Davies [10:14 A.M.]
That should work. I'll update the shipping schedule.

Laura Chen [10:15 A.M.]
Great. I'll call the client and explain.""")],
 qs=[
 ("細節", "What did the client request?", ["Additional products", "A refund", "An earlier delivery date", "A different model"], "They want 50 more units → 追加產品。"),
 ("意圖", "At 10:05 A.M., what does Mr. Davies most likely mean when he writes, \"Let me check our stock\"?", ["He needs to find out how many items are available.", "He wants to place a new order.", "He thinks the client made a mistake.", "He will visit the client."], "意圖題看前後文：Laura 問能不能多出 50 個，他要先查庫存有多少。"),
 ("下一步", "What will Ms. Chen most likely do next?", ["Contact a customer", "Visit the warehouse", "Update a schedule", "Call the factory"], "I'll call the client and explain。更新出貨表的是 Mark。"),
 ]),
dict(t='單篇：徵才廣告', kind='single', docs=[('Job advertisement', """Sunrise Hotel Group is seeking an experienced Front Desk Supervisor for our downtown location.

Responsibilities:
• Supervise a team of eight front desk agents
• Handle guest complaints and special requests
• Prepare weekly staff schedules

Requirements:
• At least three years of hotel experience, including one year in a supervisory role
• Excellent communication skills
• Ability to speak a second language is preferred but not required

Applicants must be available to work weekends and holidays. To apply, send a résumé and cover letter to jobs@sunrisehotels.com by June 30.""")],
 qs=[
 ("細節", "What is one responsibility of the position?", ["Creating work schedules", "Training new managers", "Cleaning guest rooms", "Planning hotel events"], "Prepare weekly staff schedules → creating work schedules。"),
 ("細節", "What is NOT a requirement for the position?", ["Knowledge of a second language", "Hotel experience", "Supervisory experience", "Strong communication skills"], "second language is preferred but not required。"),
 ("同義字", "The word \"handle\" in the list of responsibilities is closest in meaning to", ["deal with", "hold", "touch", "carry"], "handle guest complaints = 處理客訴，deal with。hold/carry 是拿著的意思。"),
 ]),
dict(t='單篇：E-mail（插入句）', kind='single', docs=[('E-mail', """To: Olivia Grant
From: Samuel Ortiz
Subject: Thank you
Date: March 3

Dear Ms. Grant,

Thank you for speaking at our small-business workshop last Thursday. — [1] — Many participants told us your advice on online marketing was the most useful part of the day.

As promised, I have attached the participant feedback forms. — [2] — You will see that the average rating for your session was 4.8 out of 5.

We are planning another workshop in September and would be delighted if you could join us again. — [3] — I will contact you next month with more details.

Thank you again for your contribution. — [4] —

Best regards,
Samuel Ortiz
Riverside Business Association""")],
 qs=[
 ("目的", "Why did Mr. Ortiz write the e-mail?", ["To thank a speaker", "To register for a workshop", "To request payment", "To complain about a session"], "Thank you for speaking at our workshop。"),
 ("細節", "What did Mr. Ortiz send with the e-mail?", ["Feedback forms", "A workshop schedule", "A contract", "A payment receipt"], "I have attached the participant feedback forms。"),
 ("插入句", "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\"The topic would again be digital tools for small businesses.\"", ["[3]", "[1]", "[2]", "[4]"], "這句在說「下次的主題」，要放在提到九月新工作坊之後 → [3]。"),
 ]),
dict(t='單篇：發票', kind='single', docs=[('Invoice', """GREEN LEAF OFFICE SUPPLIES
Invoice #20931     Date: November 4
Bill to: Harmon & Price Accounting

Item                          Qty    Unit Price    Total
Printer paper (box)           10     $25.00        $250.00
Black ink cartridges           6     $30.00        $180.00
Desk organizers                4     $15.00         $60.00
                                     Subtotal      $490.00
                     Discount (10%, orders over $400)  -$49.00
                                     TOTAL         $441.00

Payment due within 30 days. Late payments are subject to a 2% monthly fee.
Thank you for your business!""")],
 qs=[
 ("細節", "Why did Harmon & Price receive a discount?", ["Its order exceeded a certain amount.", "It paid in advance.", "It is a new customer.", "Some items were damaged."], "Discount (10%, orders over $400) → 訂單超過一定金額。"),
 ("細節", "How much did the customer pay for ink cartridges?", ["$180.00", "$30.00", "$250.00", "$60.00"], "6 × $30 = $180。"),
 ("推論", "What is suggested about the invoice?", ["An additional charge may apply if payment is late.", "The items have not been shipped yet.", "The customer has already paid.", "Delivery fees are included."], "Late payments are subject to a 2% monthly fee。"),
 ]),
dict(t='單篇：新聞報導', kind='single', docs=[('Article', """TECH FIRM TO OPEN RESEARCH CENTER IN TAICHUNG

(March 12) — Novatek Systems announced yesterday that it will open a research and development center in Taichung next year. The center is expected to create about 300 jobs, most of them for engineers and software developers.

Novatek, which makes sensors for electric vehicles, chose Taichung because of its strong manufacturing base and close ties with local universities. "We want to work closely with universities to train the next generation of engineers," said CEO Lisa Huang.

Construction will begin in May. The company also plans to offer internships to university students starting in the summer of next year.""")],
 qs=[
 ("主旨", "What is the article mainly about?", ["A company's expansion plans", "A new university program", "The opening of a factory", "A change in leadership"], "宣布在台中設研發中心 → 擴張計畫。"),
 ("細節", "What does Novatek Systems produce?", ["Sensors for vehicles", "Electric vehicles", "Software for universities", "Construction materials"], "makes sensors for electric vehicles。"),
 ("細節", "According to the article, why was Taichung chosen?", ["It has connections with universities.", "Land is inexpensive there.", "The CEO grew up there.", "It is close to an airport."], "close ties with local universities。"),
 ("細節", "What will Novatek offer students?", ["Internships", "Scholarships", "Free courses", "Part-time jobs at the factory"], "offer internships to university students。"),
 ]),
dict(t='單篇：網頁評論', kind='single', docs=[('Customer review', """★★★★☆  Reviewed by Paul S.

I bought the TrekLite backpack for a two-week hiking trip in Japan. It's very light and has plenty of pockets, which made it easy to stay organized. The shoulder straps are comfortable even after a long day of walking.

My only complaint is that the material is not fully waterproof. On a rainy day, some of my clothes got wet. I'd recommend buying the rain cover, which is sold separately.

Overall, it's a great backpack for the price, and I would buy it again.""")],
 qs=[
 ("細節", "What does Paul S. like about the backpack?", ["It has many compartments.", "It is fully waterproof.", "It comes with a rain cover.", "It is very large."], "plenty of pockets = many compartments。"),
 ("細節", "What problem did Paul S. have?", ["Some items got wet.", "A strap broke.", "The bag was too heavy.", "A pocket was missing."], "some of my clothes got wet。"),
 ("推論", "What is implied about the rain cover?", ["It costs extra.", "It is out of stock.", "It is included with the backpack.", "It is not effective."], "sold separately → 要另外付錢。"),
 ]),
dict(t='單篇：表單', kind='single', docs=[('Form', """CITY SPORTS CENTER — Facility Reservation Form

Name: Andrew Pham
Organization: Westside Youth Soccer Club
Phone: 555-0177

Facility requested:  ☐ Basketball court   ☑ Indoor soccer field   ☐ Swimming pool
Date: Saturday, January 18
Time: 1:00 P.M. – 4:00 P.M.
Number of participants: 40
Equipment needed: 20 practice cones, 2 portable goals

Purpose of reservation: Winter skills training for players ages 10–12

For office use only: Fee paid ☑  Confirmed by: K. Lim""")],
 qs=[
 ("細節", "What is Mr. Pham reserving?", ["A soccer field", "A swimming pool", "A basketball court", "A meeting room"], "勾選 Indoor soccer field。"),
 ("推論", "Who most likely will participate in the event?", ["Young athletes", "Professional players", "Sports coaches", "Center employees"], "players ages 10–12 → 年輕球員。"),
 ("推論", "What is indicated about the reservation?", ["It has been paid for.", "It is for a full day.", "It requires a lifeguard.", "It was made by K. Lim."], "Fee paid ☑ → 已付款。K. Lim 是確認的職員，不是預約人。"),
 ]),
dict(t='單篇：線上聊天（多人）', kind='single', docs=[('Online chat discussion', """Hiro Sato [2:30 P.M.]: The projector in Room 4 isn't working again. I have a client presentation at 3:00.
Amy Ross [2:31 P.M.]: Room 6 is free this afternoon. You could use that one.
Hiro Sato [2:32 P.M.]: Room 6 only seats four. I'm expecting eight people.
Ben Clark [2:34 P.M.]: I can bring the portable projector from the storage room to Room 4.
Hiro Sato [2:35 P.M.]: You're a lifesaver, Ben.
Ben Clark [2:36 P.M.]: I'll be there in ten minutes. I'll also put in a repair request for the old one.""")],
 qs=[
 ("細節", "Why is Mr. Sato concerned?", ["Some equipment is not working.", "A client canceled a meeting.", "He is late for a presentation.", "A room has been double-booked."], "The projector isn't working。"),
 ("推論", "Why is Room 6 not suitable?", ["It is too small.", "It is being repaired.", "It has no projector.", "It is reserved."], "Room 6 only seats four，但要八個人 → 太小。"),
 ("意圖", "At 2:35 P.M., what does Mr. Sato mean when he writes, \"You're a lifesaver, Ben\"?", ["He is grateful for Mr. Clark's help.", "He thinks Mr. Clark should work in safety.", "He wants Mr. Clark to attend the meeting.", "He is worried about Mr. Clark."], "lifesaver 是口語「救星」，表示感謝。"),
 ]),
dict(t='單篇：信件（同義字）', kind='single', docs=[('Letter', """Dear Valued Customer,

We are writing to inform you that, effective February 1, Metro Bank will close its branch at 18 Queen Street. This decision was made after a careful review of how our customers use our services; more than 80 percent of transactions at this branch are now completed online or at ATMs.

Your accounts will be automatically transferred to our King Street branch, located just two blocks away. Your account numbers will remain the same, and no action is required on your part.

The ATM at Queen Street will continue to operate until the end of the year. If you have any questions, please speak with any of our staff members or call our 24-hour service line.

Sincerely,
Customer Relations, Metro Bank""")],
 qs=[
 ("主旨", "What is the purpose of the letter?", ["To announce a branch closure", "To introduce a new online service", "To request account information", "To advertise a loan"], "will close its branch at 18 Queen Street。"),
 ("細節", "According to the letter, why was the decision made?", ["Most customers use online services or ATMs.", "The building needs repairs.", "The rent has increased.", "A new branch is opening downtown."], "more than 80 percent of transactions are completed online or at ATMs。"),
 ("同義字", "The word \"remain\" in paragraph 2 is closest in meaning to", ["stay", "leave", "wait", "rest"], "account numbers will remain the same = 保持不變 stay the same。"),
 ("細節", "What will happen to the ATM on Queen Street?", ["It will be available for several more months.", "It will be removed on February 1.", "It will be moved to King Street.", "It will be upgraded."], "continue to operate until the end of the year。"),
 ]),
# ================= Double passages =================
dict(t='雙篇：活動通知＋E-mail', kind='double', docs=[
 ('Notice', """ANNUAL STAFF APPRECIATION DINNER

Date: Friday, December 6
Time: 6:30 P.M.
Place: Grand Palace Hotel, Crystal Ballroom

Menu choices: Beef, Salmon, or Vegetarian Pasta
Please register by November 22 using the online form and indicate your menu choice. Employees may bring one guest. Guests must also select a menu option.

Transportation: A shuttle bus will leave from the company parking lot at 6:00 P.M."""),
 ('E-mail', """To: events@cortexcorp.com
From: Mina Park
Date: November 25
Subject: Dinner registration

Hello,

I'm sorry for missing the registration deadline. I was on a business trip in Singapore until yesterday. Is it still possible to sign up for the dinner? I would like the salmon, and my husband, who will be joining me, would prefer the vegetarian option.

Also, we will be driving there ourselves, so we won't need the shuttle.

Thank you,
Mina Park
Accounting Department""")],
 qs=[
 ("細節", "What is the purpose of the event?", ["To thank employees", "To welcome new clients", "To celebrate a hotel opening", "To raise money for charity"], "Staff Appreciation Dinner → 感謝員工。"),
 ("跨篇推論", "Why did Ms. Park miss the deadline?", ["She was traveling for work.", "She forgot about the event.", "The online form was not working.", "She was on vacation."], "第二篇：I was on a business trip in Singapore。"),
 ("跨篇推論", "When should Ms. Park have registered?", ["By November 22", "By November 25", "By December 6", "By November 6"], "第一篇的截止日 November 22；她 11/25 才寫信。雙篇題要把兩篇的資訊對起來。"),
 ("細節", "What will Ms. Park's husband most likely eat?", ["Pasta", "Beef", "Salmon", "Chicken"], "丈夫要 vegetarian option，第一篇顯示素食是 Vegetarian Pasta。"),
 ("推論", "What is suggested about Ms. Park?", ["She will not take the shuttle bus.", "She works in the events department.", "She has attended the dinner before.", "She will arrive late."], "we will be driving there ourselves, so we won't need the shuttle。"),
 ]),
dict(t='雙篇：產品頁＋客訴', kind='double', docs=[
 ('Web page', """BrightHome Smart Thermostat — Model T200

• Controls heating and cooling from your smartphone
• Learns your daily routine and adjusts temperature automatically
• Compatible with most heating systems
• Price: $149
• Warranty: 2 years (parts and labor)

Free shipping on all orders over $100. Returns accepted within 60 days."""),
 ('E-mail', """To: support@brighthome.com
From: Carlos Mendes
Date: August 14
Subject: Problem with T200

Hello,

I purchased a T200 thermostat from your Web site about eighteen months ago. Last week, it stopped responding to my smartphone app, and the screen now stays blank. I have already tried restarting it and reinstalling the app.

I would like to know how to have the device repaired. I still have my order confirmation if you need it.

Regards,
Carlos Mendes""")],
 qs=[
 ("細節", "What is NOT mentioned as a feature of the T200?", ["It has a voice assistant.", "It can be controlled by phone.", "It adjusts temperature on its own.", "It works with most systems."], "第一篇沒提到語音助理。"),
 ("細節", "What problem does Mr. Mendes report?", ["The device is not working properly.", "He was charged twice.", "The device was never delivered.", "He received the wrong model."], "stopped responding、screen stays blank。"),
 ("跨篇推論", "What is most likely true about Mr. Mendes's thermostat?", ["It is still under warranty.", "It can be returned for a full refund.", "It was shipped for free.", "It is an older model."], "買了 18 個月，保固 2 年 → 仍在保固內。60 天退貨期已過。"),
 ("推論", "What does Mr. Mendes offer to provide?", ["Proof of purchase", "A photograph of the device", "His home address", "A copy of the warranty"], "I still have my order confirmation = proof of purchase。"),
 ("同義字", "In the e-mail, the word \"stays\" in paragraph 1 is closest in meaning to", ["remains", "visits", "lives", "stops"], "the screen stays blank = 螢幕一直是空白的，remains。"),
 ]),
# ================= Triple passages =================
dict(t='三篇：課程廣告＋報名表＋E-mail', kind='triple', docs=[
 ('Advertisement', """NORTHSIDE COMMUNITY COLLEGE — Evening Courses for Professionals (Spring Term)

Business Writing        Mondays      7–9 P.M.    $180
Presentation Skills     Tuesdays     7–9 P.M.    $200
Excel for Beginners     Wednesdays   6–8 P.M.    $160
Project Management      Thursdays    7–9 P.M.    $240

All courses run for eight weeks starting March 3. Register before February 15 to receive a 15% early registration discount."""),
 ('Registration form', """Name: Jenny Wu
Employer: Coastal Logistics
Course(s): Excel for Beginners; Project Management
Date submitted: February 10
Payment method: Company invoice"""),
 ('E-mail', """To: Jenny Wu
From: registration@northside.edu
Date: February 20
Subject: Course change

Dear Ms. Wu,

We regret to inform you that the instructor for our Thursday course has had to withdraw for personal reasons. The course will now be held on Fridays at the same time, starting March 7. If this new schedule does not suit you, you may switch to another course or receive a full refund for this course.

Please let us know your decision by February 28.

Registration Office""")],
 qs=[
 ("細節", "What is indicated about the courses?", ["They last for eight weeks.", "They are held on weekends.", "They are free for students.", "They are taught online."], "All courses run for eight weeks。"),
 ("跨篇推論", "Why will Ms. Wu most likely receive a discount?", ["She registered before February 15.", "She is taking two courses.", "Her employer is a partner company.", "She is a former student."], "表單提交日 2/10，早於 2/15 早鳥期限。"),
 ("跨篇推論", "Which course has had a schedule change?", ["Project Management", "Excel for Beginners", "Business Writing", "Presentation Skills"], "E-mail 說週四的課改期；廣告顯示週四是 Project Management。三篇題常要跨兩篇才能找到答案。"),
 ("細節", "What time will the rescheduled course be held?", ["7–9 P.M.", "6–8 P.M.", "5–7 P.M.", "8–10 P.M."], "at the same time → 原本週四 7–9 P.M.。"),
 ("細節", "What is Ms. Wu asked to do by February 28?", ["Inform the college of her decision", "Pay the course fee", "Submit a new registration form", "Contact the instructor"], "Please let us know your decision by February 28。"),
 ]),
dict(t='三篇：出差行程＋飯店確認＋簡訊', kind='triple', docs=[
 ('Itinerary', """TRAVEL ITINERARY — Daniel Okafor, Sales Director

Mon, May 12   Flight TP 318  Taipei → Osaka   Departs 8:20 A.M.   Arrives 11:50 A.M.
Mon, May 12   Meeting with Hanshin Retail, 3:00 P.M.
Tue, May 13   Trade fair, Osaka International Exhibition Center (all day)
Wed, May 14   Flight TP 321  Osaka → Taipei   Departs 6:10 P.M."""),
 ('Hotel confirmation', """Kansai Bay Hotel — Reservation Confirmation

Guest: Daniel Okafor
Check-in: May 12   Check-out: May 14
Room: Executive Single (non-smoking), 2 nights
Rate includes: breakfast, airport shuttle (every 30 minutes, 7 A.M.–9 P.M.)
Note: Late check-out until 2 P.M. available on request."""),
 ('Text message', """From: Daniel Okafor   To: Sophie (Assistant)   May 13, 9:40 P.M.

Sophie, the meeting with Hanshin went really well—they want a second meeting tomorrow at 11 A.M. at their office. Could you ask the hotel about the request mentioned in my booking? I don't want to carry my luggage to the meeting. Thanks!""")],
 qs=[
 ("目的", "What is the main purpose of Mr. Okafor's trip?", ["To conduct business", "To attend a training course", "To take a vacation", "To interview job candidates"], "業務會議與商展 → 出差洽公。"),
 ("細節", "What does the hotel rate include?", ["Transportation to the airport", "Dinner", "A conference room", "Late check-out"], "airport shuttle 含在房價中；延遲退房要另外申請。"),
 ("跨篇推論", "What will Sophie most likely ask the hotel to do?", ["Allow a late check-out", "Change the room type", "Book an airport shuttle", "Extend the stay by one night"], "簡訊說 the request mentioned in my booking，飯店確認單上可申請的是延遲退房到兩點，不想帶行李去開會。"),
 ("推論", "What is suggested about Mr. Okafor's meeting on May 14?", ["It will take place before his flight.", "It will be held at the hotel.", "It was planned before the trip.", "It will be held at the trade fair."], "會議 11 A.M.，班機 6:10 P.M. → 在班機之前。地點是對方辦公室。"),
 ("細節", "When did Mr. Okafor first meet with Hanshin Retail?", ["On the afternoon he arrived", "On the morning of May 13", "At the trade fair", "On May 14"], "行程表：5/12 抵達當天下午三點和 Hanshin 開會。"),
 ]),
]
