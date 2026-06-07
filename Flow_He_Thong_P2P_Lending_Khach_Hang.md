# FLOW HOẠT ĐỘNG TỔNG THỂ HỆ THỐNG P2P LENDING

## 1. Tổng quan hệ thống

Hệ thống P2P Lending là nền tảng kết nối giữa **Người vay** và **Nhà đầu tư**, cho phép xử lý toàn bộ vòng đời khoản vay từ đăng ký, xác minh danh tính, tạo hồ sơ vay, thẩm định, ghép vốn, ký hợp đồng, giải ngân, quản lý khoản vay, thanh toán và phân bổ lợi nhuận cho nhà đầu tư.

Mục tiêu của hệ thống:

- Số hóa toàn bộ quy trình vay và đầu tư.
- Tự động hóa thẩm định, matching và kiểm soát rủi ro.
- Minh bạch dòng tiền giữa người vay, nhà đầu tư và hệ thống.
- Đảm bảo đầy đủ kiểm soát vận hành, audit log và compliance.
- Hỗ trợ mở rộng theo mô hình nhiều sản phẩm vay, nhiều gói vốn và nhiều cấp phê duyệt.

---

## 2. Các tác nhân trong hệ thống

| Tác nhân | Vai trò chính | Kênh sử dụng |
|---|---|---|
| Borrower / Người vay | Đăng ký, KYC, tạo hồ sơ vay, khai báo tài sản, ký hợp đồng, nhận giải ngân, trả nợ | Mobile/Web |
| Investor / Nhà đầu tư | Đăng ký, xác minh, nạp vốn, chọn khẩu vị đầu tư, theo dõi ROI, rút vốn | Mobile/Web |
| Compliance/Admin | Kiểm tra KYC, blacklist, fraud, audit, pháp lý | Web Admin |
| Credit Officer | Thẩm định tín dụng, đánh giá hồ sơ vay | Web Admin |
| Appraiser | Kiểm định và định giá tài sản bảo đảm | Web Admin/Mobile |
| Manager/Approver | Phê duyệt nhiều cấp, duyệt/từ chối hồ sơ | Web Admin |
| Finance Team | Xác minh nạp tiền, giải ngân, đối soát thanh toán | Web Admin |
| Treasury Team | Quản lý gói vốn, hạn mức vốn, dòng tiền | Web Admin |
| Super Admin | Quản lý người dùng, phân quyền, cấu hình hệ thống | Web Admin |
| Risk Engine | Chấm điểm rủi ro người vay, khoản vay và tài sản | Backend |
| Matching Engine | Ghép khoản vay với nhà đầu tư phù hợp | Backend |
| Finance Engine | Tính lãi, phí phạt, ledger, ROI | Backend |
| Notification Engine | Gửi thông báo realtime, SMS, email, push | Backend |
| Audit System | Ghi nhận nhật ký bất biến toàn bộ thao tác quan trọng | Backend |

---

## 3. Nhóm chức năng chính

| Nhóm chức năng | Mục đích |
|---|---|
| Authentication & eKYC | Đăng ký, đăng nhập, xác minh CCCD, face matching, blacklist |
| Borrower Profile | Quản lý hồ sơ người vay, nghề nghiệp, thu nhập, tài khoản ngân hàng |
| Investor Profile | Quản lý hồ sơ nhà đầu tư, ví đầu tư, khẩu vị rủi ro |
| Capital Package | Quản lý các gói vốn PA1, PA2, PA3, PA4, ROI và quota |
| Funding | Nạp vốn, xác minh giao dịch, khóa vốn, hoàn vốn |
| Loan Application | Tạo hồ sơ vay, khai báo khoản vay, upload giấy tờ, gửi duyệt |
| Asset Management | Tiếp nhận, xác minh, định giá và quản lý tài sản bảo đảm |
| Matching Engine | Tự động ghép khoản vay với nguồn vốn phù hợp |
| Approval Workflow | Thẩm định, phê duyệt nhiều cấp, lưu audit log |
| eContract | Sinh hợp đồng, ký điện tử, lưu trữ, quản lý version |
| Disbursement | Kiểm tra điều kiện và giải ngân khoản vay |
| Loan Management | Quản lý khoản vay, lịch trả nợ, lãi, phí phạt, trạng thái |
| Payment | Thanh toán, QR, auto debit, đối soát, phân bổ dòng tiền |
| Investor Operations | Theo dõi danh mục đầu tư, ROI, lịch sử, rút vốn, tái đầu tư |
| Notification | Gửi thông báo cho người vay, nhà đầu tư và đội vận hành |
| Admin | Quản trị người dùng, phân quyền, audit, fraud dashboard, cấu hình |

---

## 4. Flow tổng thể hệ thống

### 4.1 Flow chính từ người vay đến tất toán

```text
Người vay / Borrower
        |
        v
Đăng ký tài khoản
        |
        v
Đăng nhập hệ thống
        |
        v
Xác minh danh tính eKYC
        |
        v
Kiểm tra blacklist / fraud
        |
        v
Sinh mã định danh NasID
        |
        v
Hoàn thiện hồ sơ người vay
        |
        v
Khai báo nghề nghiệp, thu nhập, tài khoản ngân hàng
        |
        v
Tạo hồ sơ vay
        |
        v
Chọn sản phẩm vay, số tiền vay, mục đích vay
        |
        v
Upload hồ sơ giấy tờ
        |
        v
Khai báo tài sản bảo đảm
        |
        v
Thẩm định tài sản bảo đảm
        |
        v
Risk Engine chấm điểm rủi ro
        |
        v
Matching Engine ghép khoản vay với nguồn vốn phù hợp
        |
        v
Approval Workflow thẩm định và phê duyệt nhiều cấp
        |
        v
Sinh hợp đồng điện tử
        |
        v
Người vay và nhà đầu tư ký hợp đồng điện tử
        |
        v
Kiểm tra điều kiện giải ngân
        |
        v
Giải ngân khoản vay
        |
        v
Quản lý khoản vay đang hoạt động
        |
        v
Sinh lịch trả nợ
        |
        v
Người vay thanh toán định kỳ
        |
        v
Đối soát thanh toán
        |
        v
Phân bổ gốc, lãi, phí
        |
        v
Phân bổ lợi nhuận cho nhà đầu tư
        |
        v
Tất toán khoản vay
```

---

### 4.2 Flow phía nhà đầu tư

```text
Nhà đầu tư / Investor
        |
        v
Đăng ký tài khoản
        |
        v
Đăng nhập hệ thống
        |
        v
Xác minh danh tính / Investor Verification
        |
        v
Hoàn thiện hồ sơ nhà đầu tư
        |
        v
Thiết lập khẩu vị rủi ro
        |
        v
Thiết lập điều kiện đầu tư
        |
        v
Nạp vốn vào ví đầu tư
        |
        v
Hệ thống xác minh giao dịch nạp tiền
        |
        v
Cập nhật số dư ví đầu tư
        |
        v
Matching Engine tìm khoản vay phù hợp
        |
        v
Khóa vốn khi matching thành công
        |
        v
Tham gia ký hợp đồng điện tử
        |
        v
Theo dõi danh mục đầu tư
        |
        v
Theo dõi ROI
        |
        v
Nhận phân bổ gốc và lãi từ khoản vay
        |
        v
Rút vốn hoặc tái đầu tư
```

---

### 4.3 Flow phía vận hành nội bộ

```text
Admin / Compliance / Credit / Appraiser / Finance
        |
        v
Đăng nhập Web Admin
        |
        v
Kiểm tra hồ sơ KYC
        |
        v
Kiểm tra blacklist / fraud
        |
        v
Tiếp nhận hồ sơ vay
        |
        v
Thẩm định tín dụng
        |
        v
Thẩm định tài sản bảo đảm
        |
        v
Review kết quả chấm điểm rủi ro
        |
        v
Review kết quả matching
        |
        v
Phê duyệt hoặc từ chối hồ sơ
        |
        v
Kiểm tra hợp đồng điện tử
        |
        v
Kiểm tra điều kiện giải ngân
        |
        v
Thực hiện hoặc xác nhận giải ngân
        |
        v
Theo dõi thanh toán
        |
        v
Đối soát giao dịch
        |
        v
Giám sát audit log và fraud dashboard
```

---

### 4.4 Flow khi hồ sơ được duyệt

```text
Hồ sơ vay được gửi
        |
        v
Hệ thống kiểm tra dữ liệu hồ sơ
        |
        v
Risk Engine chấm điểm người vay, tài sản và khoản vay
        |
        v
Matching Engine ghép vốn
        |
        v
Credit Officer thẩm định tín dụng
        |
        v
Appraiser thẩm định tài sản
        |
        v
Manager / Approver phê duyệt
        |
        v
Hệ thống sinh hợp đồng điện tử
        |
        v
Người vay ký hợp đồng
        |
        v
Nhà đầu tư ký hợp đồng
        |
        v
Finance kiểm tra điều kiện giải ngân
        |
        v
Giải ngân khoản vay
        |
        v
Khoản vay chuyển sang trạng thái ACTIVE
```

---

### 4.5 Flow khi hồ sơ bị từ chối

```text
Hồ sơ vay được gửi
        |
        v
Risk Engine / Credit Team / Asset Team đánh giá
        |
        v
Không đạt điều kiện phê duyệt
        |
        v
Hồ sơ bị từ chối
        |
        v
Hệ thống ghi nhận lý do từ chối
        |
        v
Thông báo cho người vay
        |
        v
Hoàn vốn đã lock cho nhà đầu tư nếu có
        |
        v
Ghi audit log
```

---

## 5. Chi tiết các giai đoạn nghiệp vụ

### 5.1 Đăng ký, đăng nhập và xác minh danh tính

Người dùng bắt đầu bằng việc đăng ký tài khoản và đăng nhập vào hệ thống.

Các bước chính:

1. Đăng ký tài khoản.
2. Xác thực OTP nếu có.
3. Đăng nhập hệ thống.
4. Xác minh CCCD bằng OCR.
5. Đối chiếu khuôn mặt.
6. Kiểm tra blacklist.
7. Sinh mã định danh duy nhất NasID.
8. Liên kết thiết bị.

Ghi chú:

- Người dùng chưa hoàn tất KYC không nên được tạo hồ sơ vay hoặc đầu tư.
- Nếu eKYC thất bại, hồ sơ chuyển sang hàng đợi review thủ công.
- Blacklist screening là bước bắt buộc trước khi cho phép vay hoặc đầu tư.

---

### 5.2 Hoàn thiện hồ sơ người vay

Người vay cần bổ sung dữ liệu để hệ thống đánh giá năng lực tài chính.

Thông tin bao gồm:

- Thông tin cá nhân.
- Nghề nghiệp.
- Thu nhập.
- Tài khoản ngân hàng.
- Giấy tờ chứng minh thu nhập.

Kết quả:

- Hệ thống tính Financial Health Score.
- Risk Engine tạo Borrower Risk Rating.
- Hồ sơ đủ điều kiện mới được tạo khoản vay.

---

### 5.3 Hoàn thiện hồ sơ nhà đầu tư

Nhà đầu tư cần xác minh thông tin trước khi tham gia cấp vốn.

Thông tin bao gồm:

- Hồ sơ cá nhân hoặc tổ chức.
- Xác minh KYC/KYB.
- Ví đầu tư.
- Khẩu vị rủi ro.
- Điều kiện đầu tư.

Ví dụ điều kiện đầu tư:

- Mức rủi ro chấp nhận.
- Kỳ hạn đầu tư.
- ROI kỳ vọng.
- Loại tài sản bảo đảm.
- Số tiền tối đa cho mỗi khoản vay.

---

### 5.4 Quản lý gói vốn

Hệ thống hỗ trợ nhiều loại gói vốn.

| Gói vốn | Ý nghĩa |
|---|---|
| PA1 | Gói lợi tức cố định |
| PA2 | Gói linh hoạt |
| PA3 | Gói chia sẻ doanh thu |
| PA4 | Gói có tài sản bảo đảm |

Mỗi gói vốn cần có:

- ROI configuration.
- Quota.
- Hạn mức tối đa.
- Điều kiện tham gia.
- Quy tắc matching.

---

### 5.5 Tạo hồ sơ vay

Người vay tạo hồ sơ vay mới trên mobile hoặc web.

Các bước:

1. Chọn sản phẩm vay.
2. Nhập số tiền vay.
3. Khai báo mục đích vay.
4. Upload hồ sơ giấy tờ.
5. Khai báo tài sản bảo đảm.
6. Lưu nháp hoặc gửi hồ sơ.
7. Theo dõi trạng thái xử lý.

Ghi chú:

- Sau khi gửi hồ sơ, hệ thống kích hoạt workflow thẩm định.
- Hồ sơ có thể bị yêu cầu bổ sung nếu thiếu giấy tờ.
- Hồ sơ chỉ đi tiếp nếu dữ liệu người vay và tài sản hợp lệ.

---

### 5.6 Quản lý tài sản bảo đảm

Tài sản bảo đảm được xử lý bởi đội thẩm định tài sản.

Các bước:

1. Tiếp nhận tài sản.
2. Kiểm tra hình ảnh và giấy tờ.
3. Xác minh quyền sở hữu.
4. Định giá đa lớp.
5. Chấm điểm rủi ro tài sản.
6. Lưu thông tin vào danh sách tài sản bảo đảm.

Ghi chú:

- Định giá nên có nhiều lớp để tránh sai lệch.
- Cần kiểm tra tài sản trùng lặp, giấy tờ giả, tài sản không hợp lệ.
- Asset Risk Rating ảnh hưởng trực tiếp đến quyết định duyệt khoản vay.

---

### 5.7 Chấm điểm rủi ro

Risk Engine nhận dữ liệu từ người vay, khoản vay và tài sản bảo đảm.

Đầu vào:

- Thu nhập.
- Nghề nghiệp.
- Tài khoản ngân hàng.
- Lịch sử vay.
- Giá trị tài sản.
- Tỷ lệ LTV.
- Blacklist/Fraud signal.
- Mục đích vay.
- Kỳ hạn vay.

Đầu ra:

- Borrower Risk Rating.
- Asset Risk Rating.
- Loan Risk Score.
- Đề xuất điều kiện vay.
- Cảnh báo fraud nếu có.

---

### 5.8 Matching khoản vay với nhà đầu tư

Matching Engine ghép khoản vay với nguồn vốn phù hợp.

Điều kiện matching:

- Khoản vay đã qua scoring.
- Nhà đầu tư có số dư khả dụng.
- Gói vốn còn quota.
- Khẩu vị rủi ro phù hợp.
- ROI phù hợp.
- Kỳ hạn phù hợp.
- Loại tài sản phù hợp.

Kết quả:

- Tạo Match Result.
- Lock vốn của nhà đầu tư.
- Gửi hồ sơ sang Approval Workflow.
- Gửi thông báo match thành công.

Ghi chú:

- Nếu hồ sơ bị từ chối, vốn đã lock phải được release.
- Admin có thể review thủ công trong trường hợp đặc biệt.

---

### 5.9 Phê duyệt hồ sơ vay

Approval Workflow là quy trình duyệt nhiều cấp.

Các bước:

1. Loan Review Queue.
2. Credit Assessment.
3. Collateral Review.
4. Multi-layer Approval.
5. Approval Decision.
6. Approval Audit Log.

Quy tắc:

- Mọi quyết định phải có lý do.
- Hồ sơ rủi ro cao cần cấp duyệt cao hơn.
- Khoản vay vượt hạn mức phải qua manager.
- Không cho sửa audit log sau khi phê duyệt.

---

### 5.10 Hợp đồng điện tử

Sau khi hồ sơ được duyệt, hệ thống sinh hợp đồng điện tử.

Các bước:

1. Sinh hợp đồng từ dữ liệu khoản vay.
2. Gửi hợp đồng cho các bên.
3. Người vay ký điện tử.
4. Nhà đầu tư ký điện tử.
5. Lưu version hợp đồng.
6. Lưu audit trail hợp đồng.

Ghi chú:

- Hợp đồng nên lưu dạng PDF.
- Mỗi thay đổi cần tạo version mới.
- Digital signature có thể dùng OTP signing.

---

### 5.11 Giải ngân

Giải ngân chỉ được thực hiện khi đủ điều kiện.

Điều kiện giải ngân:

- Hồ sơ đã được duyệt.
- Vốn đã match và lock.
- Hợp đồng đã ký đủ.
- Tài khoản ngân hàng người vay hợp lệ.
- Không có cảnh báo compliance.
- Tài sản bảo đảm hợp lệ.

Các bước:

1. Kiểm tra điều kiện giải ngân.
2. Thực hiện chuyển tiền.
3. Sinh biên lai giải ngân.
4. Hạch toán ledger.
5. Cập nhật trạng thái khoản vay.

Ghi chú:

- Giao dịch giải ngân cần có idempotency key để tránh chuyển tiền trùng.
- Ledger nên theo mô hình double-entry.

---

### 5.12 Quản lý khoản vay

Sau giải ngân, khoản vay chuyển sang trạng thái active.

Hệ thống quản lý:

- Danh sách khoản vay.
- Chi tiết khoản vay.
- Lịch trả nợ.
- Tính lãi.
- Tính phí phạt.
- Trạng thái khoản vay.
- Gia hạn khoản vay.
- Tất toán trước hạn.

Trạng thái đề xuất:

```text
DRAFT
SUBMITTED
UNDER_REVIEW
MATCHED
APPROVED
CONTRACT_SIGNED
DISBURSED
ACTIVE
OVERDUE
EXTENDED
EARLY_SETTLED
SETTLED
REJECTED
CANCELLED
```

---

### 5.13 Thanh toán và đối soát

Người vay thanh toán khoản vay qua nhiều phương thức.

Phương thức:

- Payment gateway.
- QR Payment.
- Auto Debit.
- Bank transfer.

Sau khi thanh toán:

1. Hệ thống ghi nhận giao dịch.
2. Đối soát với ngân hàng/cổng thanh toán.
3. Phân bổ tiền trả nợ.
4. Sinh biên lai.
5. Cập nhật dư nợ.
6. Phân bổ dòng tiền cho nhà đầu tư.

Thứ tự phân bổ tiền đề xuất:

1. Phí phạt quá hạn.
2. Lãi đến hạn.
3. Gốc đến hạn.
4. Phí khác.
5. Dư thừa hoặc trả trước.

---

### 5.14 Vận hành nhà đầu tư

Nhà đầu tư theo dõi hiệu quả đầu tư.

Chức năng:

- Investment Portfolio.
- ROI Tracking.
- Investment History.
- Withdraw Funding.
- Auto Reinvestment.

Ghi chú:

- ROI nên phân tách expected ROI, accrued ROI và realized ROI.
- Rút vốn chỉ được thực hiện với số dư khả dụng.
- Vốn đang lock hoặc đang đầu tư không được rút.

---

### 5.15 Notification

Notification Engine gửi thông báo theo event.

Các event chính:

- Đăng ký thành công.
- KYC thành công/thất bại.
- Hồ sơ vay đã gửi.
- Hồ sơ cần bổ sung.
- Match thành công.
- Hồ sơ được duyệt/từ chối.
- Hợp đồng cần ký.
- Giải ngân thành công.
- Đến hạn thanh toán.
- Thanh toán thành công.
- Quá hạn.
- ROI cập nhật.

Kênh gửi:

- Push Notification.
- SMS.
- Email.
- In-app notification.

---

### 5.16 Admin, RBAC và Audit

Admin quản lý toàn bộ hệ thống vận hành.

Chức năng:

- User Management.
- Role Permission RBAC.
- Audit Log.
- Fraud Monitoring Dashboard.
- System Configuration.
- Product Configuration.
- Treasury Dashboard.

Ghi chú:

- Các thao tác nhạy cảm phải có phân quyền rõ.
- Nên áp dụng maker-checker cho cấu hình tài chính.
- Audit log không được sửa/xóa.
- Fraud Dashboard cần realtime hoặc near realtime.

---

## 6. Các điểm kiểm soát quan trọng

| Điểm kiểm soát | Mục đích |
|---|---|
| eKYC | Đảm bảo danh tính người dùng |
| Blacklist Screening | Chống rửa tiền, gian lận |
| Device Binding | Phát hiện multi-account, thiết bị rủi ro |
| Bank Account Binding | Đảm bảo tài khoản nhận/chi tiền đúng chủ thể |
| Asset Verification | Đảm bảo tài sản tồn tại và hợp pháp |
| Risk Scoring | Kiểm soát rủi ro tín dụng |
| Fund Locking | Tránh sử dụng trùng nguồn vốn |
| Multi-layer Approval | Kiểm soát khoản vay theo cấp duyệt |
| Digital Signature | Xác nhận cam kết pháp lý |
| Ledger Posting | Ghi nhận tài chính chuẩn |
| Reconciliation | Đối soát giao dịch tiền |
| Audit Log | Truy vết toàn bộ thao tác |

---

## 7. Trạng thái nghiệp vụ đề xuất

### 7.1 KYC Status

```text
NOT_STARTED
SUBMITTED
AUTO_VERIFIED
MANUAL_REVIEW
APPROVED
REJECTED
BLACKLISTED
```

### 7.2 Loan Application Status

```text
DRAFT
SUBMITTED
UNDER_REVIEW
RISK_ASSESSED
MATCHING
MATCHED
APPROVED
REJECTED
CONTRACT_GENERATED
SIGNED
DISBURSED
CANCELLED
```

### 7.3 Loan Account Status

```text
ACTIVE
OVERDUE
EXTENDED
EARLY_SETTLED
SETTLED
DEFAULTED
WRITTEN_OFF
```

### 7.4 Funding Status

```text
PENDING
VERIFIED
AVAILABLE
LOCKED
RELEASED
INVESTED
WITHDRAWN
FAILED
```

### 7.5 Contract Status

```text
DRAFT
GENERATED
WAITING_SIGNATURE
SIGNED
ACTIVE
CANCELLED
EXPIRED
```

---

## 8. Giá trị hệ thống

### 8.1 Đối với người vay

- Quy trình vay nhanh hơn.
- Theo dõi trạng thái hồ sơ realtime.
- Ký hợp đồng điện tử tiện lợi.
- Thanh toán và quản lý khoản vay rõ ràng.

### 8.2 Đối với nhà đầu tư

- Quản lý danh mục đầu tư tập trung.
- Theo dõi ROI rõ ràng.
- Tự động matching khoản vay phù hợp.
- Có thể rút vốn hoặc tái đầu tư.

### 8.3 Đối với doanh nghiệp

- Giảm xử lý thủ công.
- Tăng khả năng kiểm soát rủi ro.
- Minh bạch dữ liệu và dòng tiền.
- Có audit log phục vụ kiểm toán.
- Dễ mở rộng thêm sản phẩm, gói vốn và quy trình phê duyệt.

---

## 9. Ghi chú triển khai chuyên môn

### 9.1 Về hệ thống tài chính

- Nên dùng double-entry ledger.
- Không sửa giao dịch tài chính trực tiếp.
- Sai lệch phải xử lý bằng reversal transaction.
- Mỗi giao dịch nạp, giải ngân, thanh toán cần mã tham chiếu duy nhất.

### 9.2 Về bảo mật

- JWT/Auth Session cần refresh token.
- Admin Portal nên có MFA.
- Dữ liệu CCCD, hợp đồng, tài khoản ngân hàng cần mã hóa.
- Phân quyền phải theo RBAC.
- Các thao tác nhạy cảm nên có maker-checker.

### 9.3 Về vận hành

- OCR, scoring, notification, reconciliation nên chạy bất đồng bộ qua queue.
- Dashboard cần hiển thị trạng thái hồ sơ theo pipeline.
- Cần alert khi có lỗi thanh toán, lỗi giải ngân hoặc mismatch đối soát.

### 9.4 Về compliance

- KYC evidence phải được lưu trữ.
- Approval decision phải có lý do.
- Contract audit trail không được chỉnh sửa.
- Audit log nên immutable.

---

## 10. Kết luận

Flow hệ thống P2P Lending bao gồm toàn bộ chuỗi nghiệp vụ từ định danh, tạo hồ sơ vay, thẩm định, ghép vốn, phê duyệt, ký hợp đồng, giải ngân, quản lý khoản vay, thanh toán và phân bổ lợi nhuận.

Hệ thống có các đặc điểm chính:

- Số hóa toàn bộ quy trình vay và đầu tư.
- Có kiểm soát rủi ro nhiều lớp.
- Có matching tự động giữa khoản vay và nhà đầu tư.
- Có phê duyệt nhiều cấp.
- Có hợp đồng điện tử.
- Có ledger và đối soát tài chính.
- Có audit log phục vụ compliance.
- Có khả năng mở rộng theo hướng service-based architecture.
