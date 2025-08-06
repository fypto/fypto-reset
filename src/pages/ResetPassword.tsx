import React, { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getPasswordCriteriaStatus = (
  password: string,
  confirmPassword: string
) => {
  const rules = [
    password.length >= 8,
    password.length <= 64,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[!@#$%^&*]/.test(password),
    !/\s/.test(password),
  ]

  const passwordsMatch = password === confirmPassword
  const allValid = rules.every(Boolean) && passwordsMatch

  return {
    allValid,
    passwordsMatch,
    ruleStates: rules,
  }
}

const PasswordCriteria: React.FC<{
  password: string
  confirmPassword: string
}> = ({ password, confirmPassword }) => {
  const { ruleStates, passwordsMatch } = getPasswordCriteriaStatus(
    password,
    confirmPassword
  )

  const ruleLabels = [
    "Min length: 8 characters",
    "Max length: 64 characters",
    "At least 1 uppercase letter",
    "At least 1 lowercase letter",
    "At least 1 number",
    "At least 1 special character (!@#$%^&*)",
    "No spaces",
  ]

  return (
    <ul className="mt-4 space-y-1 text-sm">
      {ruleLabels.map((label, index) => (
        <li
          key={index}
          className={`flex items-center gap-2 ${
            ruleStates[index] ? "text-green-600" : "text-red-500"
          }`}
        >
          {ruleStates[index] ? "✅" : "❌"} {label}
        </li>
      ))}
      <li
        className={`flex items-center gap-2 ${
          passwordsMatch ? "text-green-600" : "text-red-500"
        }`}
      >
        {passwordsMatch ? "✅" : "❌"} Passwords match
      </li>
    </ul>
  )
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { allValid } = getPasswordCriteriaStatus(password, confirmPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!token) {
      setError("Invalid or missing reset token.")
      return
    }

    if (!allValid) {
      setError("Password does not meet the required criteria.")
      return
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/v1/reset-password`,
        { newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        setSuccess("Password reset successful. You can now log in.")
        setTimeout(() => {
          navigate("/")
        }, 2000) // 2 seconds
      } else {
        setError("Unexpected response from the server.")
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Failed to reset password. Please try again.")
      }
    }
  }

  const preventCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md p-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Reset Your Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <Label className="mb-2" htmlFor="password">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onCopy={preventCopyPaste}
                  onCut={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="mb-2" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onCopy={preventCopyPaste}
                  onCut={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <PasswordCriteria
              password={password}
              confirmPassword={confirmPassword}
            />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="border-green-500">
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!allValid}
              variant={allValid ? "default" : "secondary"}
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword
